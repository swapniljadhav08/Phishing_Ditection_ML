import pickle
import pandas as pd
import feature_extract as fe

# -----------------------------
#  Load Models and Scalers
# -----------------------------
with open('svm_model.pkl', 'rb') as f:
    svm_model = pickle.load(f)
with open('scaler_SVM.pkl', 'rb') as f:
    svm_scaler = pickle.load(f)

with open('logistic_regression_model.pkl', 'rb') as f:
    lr_model = pickle.load(f)
with open('scaler_LR.pkl', 'rb') as f:
    lr_scaler = pickle.load(f)

with open('random_forest_model.pkl', 'rb') as f:
    rf_model = pickle.load(f)  # Random Forest (no scaler)



# -----------------------------
#  URL Input
# -----------------------------
url = "https://cajaguau.com/ner.php"

# Extract features
features_df = fe.extract_url_features(url)

# Ensure same column order as training
# (if scalers/models have feature_names_in_)
for model_scaler in [svm_scaler, lr_scaler]:
    if hasattr(model_scaler, "feature_names_in_"):
        features_df = features_df.reindex(columns=model_scaler.feature_names_in_, fill_value=0)

# -----------------------------
#  Scale Features for SVM & LR
# -----------------------------
scaled_features_svm = svm_scaler.transform(features_df)
scaled_features_lr = lr_scaler.transform(features_df)

# -----------------------------
#  Make Predictions
# -----------------------------
svm_pred = svm_model.predict(scaled_features_svm)[0]
lr_pred = lr_model.predict(scaled_features_lr)[0]
rf_pred = rf_model.predict(features_df)[0]  # RF works on raw features

# -----------------------------
#  Display Results
# -----------------------------
print("🔍 URL:", url)
print("SVM Prediction:", "Phishing" if svm_pred == 1 else "Legitimate")
print("Logistic Regression Prediction:", "Phishing" if lr_pred == 1 else "Legitimate")
print("Random Forest Prediction:", "Phishing" if rf_pred == 1 else "Legitimate")

# -----------------------------
#  Optional: Majority Vote
# -----------------------------
votes = [svm_pred, lr_pred, rf_pred]
final_pred = 1 if votes.count(1) > votes.count(0) else 0

if __name__=="__main__":
 print("\n🧠 Final Decision (Majority Vote):", "Phishing" if final_pred == 1 else "Legitimate")
