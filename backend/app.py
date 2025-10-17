# app.py
import asyncio
import pickle
from typing import Optional, Dict, Any

import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from starlette.concurrency import run_in_threadpool

import feature_extract as fe  # your existing extractor module

app = FastAPI(title="Phishing URL Ensemble Predictor")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Request / Response models ----------
class PredictRequest(BaseModel):
    url: str  # purposely keep as str to allow non-strict URLs; you can use HttpUrl if you want stricter validation

class ModelResult(BaseModel):
    model: str
    prediction: int
    label: str
    probability: Optional[float] = None

class PredictResponse(BaseModel):
    url: str
    features: Dict[str, Any]
    results: Dict[str, ModelResult]
    majority_vote: ModelResult

# ---------- Globals (loaded at startup) ----------
svm_model = None
svm_scaler = None
lr_model = None
lr_scaler = None
rf_model = None

# ---------- Startup: load models & scalers ----------
@app.on_event("startup")
def load_models():
    global svm_model, svm_scaler, lr_model, lr_scaler, rf_model
    try:
        with open("svm_model.pkl", "rb") as f:
            svm_model = pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Failed to load svm_model.pkl: {e}")

    try:
        with open("scaler_SVM.pkl", "rb") as f:
            svm_scaler = pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Failed to load scaler_SVM.pkl: {e}")

    try:
        with open("logistic_regression_model.pkl", "rb") as f:
            lr_model = pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Failed to load logistic_regression_model.pkl: {e}")

    try:
        with open("scaler_LR.pkl", "rb") as f:
            lr_scaler = pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Failed to load scaler_LR.pkl: {e}")

    try:
        with open("random_forest_model.pkl", "rb") as f:
            rf_model = pickle.load(f)
    except Exception as e:
        raise RuntimeError(f"Failed to load random_forest_model.pkl: {e}")

# ---------- Helper: safe feature extraction (runs in threadpool) ----------
async def extract_features_threadsafe(url: str) -> pd.DataFrame:
    # run the synchronous extractor in a threadpool so it won't block the event loop
    df = await run_in_threadpool(fe.extract_url_features, url)
    if not isinstance(df, pd.DataFrame):
        raise ValueError("extract_url_features must return a pandas.DataFrame")
    return df

# ---------- Helper: align features to scaler's training order ----------
def align_features_for_scaler(df: pd.DataFrame, scaler) -> pd.DataFrame:
    if hasattr(scaler, "feature_names_in_"):
        # Reindex columns into the exact order used during training
        cols = list(scaler.feature_names_in_)
        df = df.reindex(columns=cols, fill_value=0)
    return df

# ---------- Helper: get probability safely ----------
def get_positive_probability(model, X):
    # Return probability of the "1" class if available, else None
    try:
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)
            # find index of class 1
            classes = list(model.classes_)
            if 1 in classes:
                idx = classes.index(1)
                return float(probs[0, idx])
            elif classes[0] == 1:
                return float(probs[0, 0])
            else:
                # fallback: return prob of positive-like class if binary but different labels
                return float(max(probs[0]))
    except Exception:
        return None
    return None

# ---------- Prediction endpoint ----------
@app.post("/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    url = req.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="URL is empty")

    # Extract features (threadsafe)
    try:
        features_df = await extract_features_threadsafe(url)  # DataFrame with one row
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Feature extraction failed: {e}")

    # Keep a copy of raw features for response (convert to plain python types)
    try:
        features_json = features_df.iloc[0].to_dict()
        # convert any numpy types to native python types
        features_json = {k: (int(v) if isinstance(v, (pd.Int64Dtype,)) else (v.item() if hasattr(v, "item") else v)) for k, v in features_json.items()}
    except Exception:
        features_json = {k: (float(v) if hasattr(v, "astype") else v) for k, v in features_df.to_dict(orient="records")[0].items()}

    # Prepare per-model inputs and predictions
    results: Dict[str, ModelResult] = {}

    # --- SVM ---
    try:
        df_svm = align_features_for_scaler(features_df.copy(), svm_scaler)
        X_svm = svm_scaler.transform(df_svm)
        svm_pred = int(svm_model.predict(X_svm)[0])
        svm_prob = get_positive_probability(svm_model, X_svm)
        results["svm"] = ModelResult(
            model="svm",
            prediction=svm_pred,
            label="Phishing" if svm_pred == 1 else "Legitimate",
            probability=svm_prob,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SVM prediction failed: {e}")

    # --- Logistic Regression ---
    try:
        df_lr = align_features_for_scaler(features_df.copy(), lr_scaler)
        X_lr = lr_scaler.transform(df_lr)
        lr_pred = int(lr_model.predict(X_lr)[0])
        lr_prob = get_positive_probability(lr_model, X_lr)
        results["logistic_regression"] = ModelResult(
            model="logistic_regression",
            prediction=lr_pred,
            label="Phishing" if lr_pred == 1 else "Legitimate",
            probability=lr_prob,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Logistic Regression prediction failed: {e}")

    # --- Random Forest ---
    try:
        # RF uses raw features in your setup
        # Ensure columns ordering if RF needs it (many tree models tolerate extra columns but align anyway)
        if hasattr(rf_model, "feature_names_in_"):
            features_for_rf = features_df.reindex(columns=rf_model.feature_names_in_, fill_value=0)
        else:
            features_for_rf = features_df
        rf_pred = int(rf_model.predict(features_for_rf)[0])
        rf_prob = get_positive_probability(rf_model, features_for_rf)
        results["random_forest"] = ModelResult(
            model="random_forest",
            prediction=rf_pred,
            label="Phishing" if rf_pred == 1 else "Legitimate",
            probability=rf_prob,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Random Forest prediction failed: {e}")

    # Majority vote (simple)
    votes = [results["svm"].prediction, results["logistic_regression"].prediction, results["random_forest"].prediction]
    majority = 1 if votes.count(1) > votes.count(0) else 0
    # If tie (1.5 vs 1.5) this logic will pick 0 (Legitimate). If you want tie-breaker, implement weighted vote.
    majority_prob_candidates = [r.probability for r in results.values() if r.probability is not None]
    majority_prob = float(sum(majority_prob_candidates) / len(majority_prob_candidates)) if majority_prob_candidates else None

    majority_result = ModelResult(
        model="majority_vote",
        prediction=majority,
        label="Phishing" if majority == 1 else "Legitimate",
        probability=majority_prob,
    )

    return PredictResponse(
        url=url,
        features=features_json,
        results=results,
        majority_vote=majority_result,
    )

# ---------- Run by: uvicorn app:app --reload (or use a production server) ----------
