import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { motion } from "framer-motion";
import { db } from "../components/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function PhishingDetection() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const HISTORY_KEY = "phish_history";

  // const saveToHistory = (entry) => {
  //   try {
  //     // const raw = localStorage.getItem(HISTORY_KEY);

  //     const arr = raw ? JSON.parse(raw) : [];
  //     arr.unshift(entry); // newest first
  //     if (arr.length > 200) arr.splice(200); // optional max length
  //     // localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
  //   } catch (err) {
  //     console.error("Failed to save history:", err);
  //   }
  // };

  const saveToHistory = async (entry) => {
  try {
    await addDoc(collection(db, "phish_history"), {
      url: entry.url,
      verdict: entry.verdict,
      confidence: entry.confidence,
      raw: entry.raw, // full backend response
      createdAt: serverTimestamp()
    });
    console.log("✅ History saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving history:", error);
  }
};

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      console.log("Backend Response:", data);
      setResult(data);

      // Save to history
      saveToHistory({
        date: new Date().toISOString(),
        url: data.url ?? url,
        verdict: data.majority_vote?.label ?? "Unknown",
        confidence:
          data.majority_vote?.probability != null
            ? (data.majority_vote.probability * 100).toFixed(1)
            : null,
        raw: data, // optional: store full result
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start py-12">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#35f531", "#23dc42"]}
          particleCount={200}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Top Buttons */}
      <div className="absolute z-20 top-4 left-4 flex gap-3 m-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-400 transition"
        >
          ← Back
        </button>
        <button
          onClick={() => navigate("/showcase")}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
        >
          History
        </button>
      </div>

      {/* Input Form */}
      <div className="relative z-10 w-full max-w-lg backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl mb-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Phishing Detection
        </h1>
        <form onSubmit={handleCheck} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter a URL to check"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-2 rounded-lg bg-black/60 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="mt-2 w-full py-2 rounded-lg bg-gradient-to-r from-yellow-300 via-lime-600 to-lime-700 text-white font-semibold transition"
          >
            {loading ? "Checking..." : "Check Link"}
          </button>
        </form>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>

      {/* Result Section */}
      {loading || result ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-3xl backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl text-white"
        >
          {loading ? (
            <div className="animate-pulse text-center text-gray-300">
              Checking URL...
            </div>
          ) : (
            <>
              {/* Final Verdict */}
              <h2 className="text-2xl font-bold text-center mb-4">
                URL: <span className="text-green-300">{result.url}</span>
              </h2>
              <div
                className={`rounded-xl p-6 text-center shadow-lg border-2 ${
                  result.majority_vote.label === "Legitimate"
                    ? "border-green-500 bg-green-500/20"
                    : "border-red-500 bg-red-500/20"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">
                  Verdict:{" "}
                  {result.majority_vote.label === "Legitimate"
                    ? "✅ Safe"
                    : "🚨 Phishing"}
                </h3>
                <p className="text-gray-300 mb-4">
                  Confidence:{" "}
                  {(result.majority_vote.probability * 100).toFixed(1)}%
                </p>
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        (result.majority_vote.probability * 100).toFixed(1)
                      }%`,
                    }}
                    transition={{ duration: 1 }}
                    className={`h-4 rounded-full ${
                      result.majority_vote.label === "Legitimate"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>

              {/* Model Comparison */}
              <h3 className="text-xl font-semibold mt-8 mb-4 text-center">
                Model Predictions
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(result.results).map(([model, info]) => (
                  <div
                    key={model}
                    className={`rounded-xl p-4 text-center border ${
                      info.label === "Legitimate"
                        ? "border-green-500 bg-green-500/20"
                        : "border-red-500 bg-red-500/20"
                    }`}
                  >
                    <h4 className="font-bold capitalize">{info.model}</h4>
                    <p
                      className={`mt-2 font-semibold ${
                        info.label === "Legitimate"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {info.label}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Confidence: {(info.probability * 100).toFixed(1)}%
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(info.probability * 100).toFixed(1)}%`,
                        }}
                        transition={{ duration: 1 }}
                        className={`h-3 rounded-full ${
                          info.label === "Legitimate"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Visualization */}
              <h3 className="text-xl font-semibold mt-10 mb-4 text-center">
                Extracted Features
              </h3>
              <div className="max-h-80 overflow-y-auto space-y-3">
                {Object.entries(result.features).map(([feature, value]) => (
                  <div key={feature}>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span className="capitalize">{feature}</span>
                      <span>{value}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(value * 5, 100)}%`,
                        }}
                        transition={{ duration: 1 }}
                        className="h-2 rounded-full bg-lime-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      ) : null}
    </div>
  );
}

export default PhishingDetection;
