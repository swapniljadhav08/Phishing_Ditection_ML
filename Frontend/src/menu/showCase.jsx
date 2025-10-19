import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { 
  FaTrash, FaInfoCircle, FaExternalLinkAlt, FaCopy, FaSearch, FaChevronDown, FaChevronUp 
} from "react-icons/fa";

// Firestore imports
import { collection, onSnapshot, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../components/firebase"; // ensure firebase is correctly initialized

function formatDate(date) {
  if (!date) return "-";
  // Firestore Timestamp check
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toLocaleString();
}

export default function Showcase() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [showRaw, setShowRaw] = useState(false);

  // Real-time Firestore listener
useEffect(() => {
  const colRef = collection(db, "phish_history");
  const q = query(colRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate()?.toISOString() // convert timestamp to ISO string
    }));
    setHistory(data);
    setFilteredHistory(data);
  });

  return () => unsubscribe();
}, []);


  // Search filter
  useEffect(() => {
    if (!search) setFilteredHistory(history);
    else {
      const lower = search.toLowerCase();
      const filtered = history.filter(
        (item) =>
          item.url.toLowerCase().includes(lower) ||
          (item.verdict || "").toLowerCase().includes(lower)
      );
      setFilteredHistory(filtered);
    }
  }, [search, history]);

  // Delete single entry
  const deleteEntry = async (id) => {
    if (!confirm("Delete this entry?")) return;
    const docRef = doc(db, "phish_history", id);
    await deleteDoc(docRef).catch(console.error);
    // onSnapshot updates UI automatically
  };

  // Clear all history
  const clearAll = async () => {
    if (!confirm("Clear all history? This cannot be undone.")) return;
    const colRef = collection(db, "phish_history");
    const snapshot = await getDocs(colRef);
    snapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "phish_history", docSnap.id)).catch(console.error);
    });
  };

  const openDetails = (item, index) => {
    setSelected({ ...item, index });
    setShowRaw(false); // hide raw result by default
  };

  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#35f531", "#23dc42"]}
          particleCount={300}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Check History</h1>
            <p className="text-sm text-gray-300 mt-1">
              View all URLs you have previously scanned using Phishing Detection.
            </p>
            <ul className="list-disc ml-5 text-gray-400 text-sm mt-2">
              <li><strong>Date:</strong> When the link was scanned.</li>
              <li><strong>URL:</strong> The website link you checked.</li>
              <li><strong>Verdict:</strong> Legitimate or Phishing classification.</li>
              <li><strong>Confidence:</strong> Model's confidence in percentage.</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border border-white/20 text-white hover:opacity-80 transition"
            >
              ← Back
            </button>
            <button
              onClick={clearAll}
              disabled={history.length === 0}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:opacity-80 disabled:opacity-50 transition"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="flex items-center mb-4 gap-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by URL or verdict..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-white/20 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* History Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl p-4 border border-white/10 shadow-md backdrop-blur-sm"
        >
          {filteredHistory.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              No history found. Check a URL on the Phishing Detection page to add entries.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="text-left text-sm text-gray-300 border-b border-white/10">
                  <tr>
                    <th className="px-3 py-3 w-12">S.No.</th>
                    <th className="px-3 py-3 w-48">Date</th>
                    <th className="px-3 py-3">URL</th>
                    <th className="px-3 py-3 w-36">Verdict</th>
                    <th className="px-3 py-3 w-28">Confidence</th>
                    <th className="px-3 py-3 w-36">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item, idx) => {
                    const verdict = item.verdict || "Unknown";
                    const conf = item.confidence ?? "-";
                    const isLegit = verdict.toLowerCase() === "legitimate";
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-white/5 transition cursor-pointer"
                        onClick={() => openDetails(item, idx)}
                      >
                        <td className="px-3 py-3 align-top text-sm text-gray-300">{idx + 1}</td>
                        <td className="px-3 py-3 align-top text-sm text-gray-300">{formatDate(item.date)}</td>
                        <td className="px-3 py-3 align-top break-all">
                          <a
                            href={item.url}
                            className="text-sm hover:underline text-sky-300"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.url}
                          </a>
                        </td>
                        <td className="px-3 py-3 text-sm font-semibold align-top">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              isLegit
                                ? "bg-green-600/20 text-green-300 border border-green-600"
                                : "bg-red-600/20 text-red-300 border border-red-600"
                            }`}
                          >
                            {isLegit ? "✅ Legitimate" : "🚨 " + verdict}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-300 align-top">
                          {conf !== null ? `${conf}%` : "-"}
                        </td>
                        <td className="px-3 py-3 align-top">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteEntry(item.id);
                              }}
                              className="flex items-center gap-1 px-3 py-1 rounded-md border border-red-500 text-red-400 hover:opacity-80 text-xs"
                            >
                              <FaTrash /> Delete
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetails(item, idx);
                              }}
                              className="flex items-center gap-1 px-3 py-1 rounded-md border border-white/20 text-white hover:opacity-80 text-xs"
                            >
                              <FaInfoCircle /> Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Details Panel */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Details</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {formatDate(selected.date)} • {selected.url}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(selected.url, "_blank", "noreferrer")}
                  className="px-3 py-1 rounded-md border border-white/20 text-white hover:opacity-80 text-sm flex items-center gap-1"
                >
                  <FaExternalLinkAlt /> Open Link
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-3 py-1 rounded-md border border-red-500 text-red-400 hover:opacity-80 text-sm flex items-center gap-1"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="mt-2">
                  <strong>Verdict : </strong>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      selected.verdict === "Legitimate"
                        ? "bg-green-600/20 text-green-300 border border-green-600"
                        : "bg-red-600/20 text-red-300 border border-red-600"
                    }`}
                  >
                    {selected.verdict === "Legitimate" ? "✅ Legitimate" : `🚨 ${selected.verdict}`}
                  </span>
                </div>

                <div className="text-sm text-gray-300 mt-2">
                  <strong>Confidence : </strong>{" "}
                  <span className="ml-1">{selected.confidence != null ? `${selected.confidence}%` : "-"}</span>
                </div>

                {/* Raw Result Toggle */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowRaw(!showRaw)}
                    className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-md border border-white/10 text-sm hover:opacity-80 transition"
                  >
                    {showRaw ? <><FaChevronUp /> Hide Raw Result</> : <><FaChevronDown /> Show Raw Result</>}
                  </button>
                  {showRaw && (
                    <pre className="mt-2 max-h-48 overflow-auto text-xs bg-black/40 p-3 rounded-md border border-white/5 text-gray-200">
                      {JSON.stringify(selected.raw ?? {}, null, 2)}
                    </pre>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-300">
                  <strong>Index</strong>
                  <div className="mt-1 text-xs text-gray-400">{selected.index}</div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(JSON.stringify(selected.raw ?? {}));
                      alert("Copied details to clipboard");
                    }}
                    className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-500 text-sm flex items-center gap-1"
                  >
                    <FaCopy /> Copy JSON
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
