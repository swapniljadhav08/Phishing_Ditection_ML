import React, { useState, useEffect, useRef, } from "react";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";
import { FaCommentDots, FaExternalLinkAlt, FaUpload, FaPlus } from "react-icons/fa";
import { db } from "../components/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
} from "firebase/firestore";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [showComments, setShowComments] = useState({});
  const commentEndRefs = useRef({});

  const reportsCollection = collection(db, "reports");

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  useEffect(() => {
    const q = query(reportsCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        comments: (doc.data().comments || []).map((c) => ({
          ...c,
          createdAt: c.createdAt?.toDate?.() || new Date(),
        })),
      }));
      setReports(data);
      setFilteredReports(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Object.keys(commentEndRefs.current).forEach((id) => {
      commentEndRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, [reports, showComments]);

  useEffect(() => {
    if (!search) setFilteredReports(reports);
    else {
      const lower = search.toLowerCase();
      setFilteredReports(
        reports.filter(
          (r) =>
            r.url?.toLowerCase().includes(lower) ||
            r.description?.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, reports]);

  const handleAddReport = async () => {
    let photoBase64 = "";
    if (photo) photoBase64 = await fileToBase64(photo);

    await addDoc(reportsCollection, {
      url,
      description,
      photoBase64,
      comments: [],
      createdAt: serverTimestamp(),
    });

    setUrl("");
    setDescription("");
    setPhoto(null);
    setShowAddForm(false);
  };

  const handleAddComment = async (reportId) => {
    const text = commentTexts[reportId]?.trim();
    if (!text) return;

    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, {
        comments: arrayUnion({
          text,
          createdAt: new Date(),
          user: "Anonymous",
        }),
      });
      setCommentTexts((prev) => ({ ...prev, [reportId]: "" }));
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
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

      <div className="relative max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className=" text-3xl font-bold">Reports</h2>
        <div className="flex gap-3">         
          <Link to="/"><button className="bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition" > ← Back</button></Link>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition"
            >
              <FaPlus /> Add Report
            </button>
          )}
        </div>          
        </div>


        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="w-full p-3 pl-10 rounded-lg border border-white/20 bg-black/40 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>

        {/* Add Report Form */}
        {showAddForm && (
          <div className="bg-black/40 p-6 rounded-lg border border-white/20 space-y-4 shadow-md">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="w-full p-3 rounded border border-white/20 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 rounded border border-white/20 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 bg-black/30 p-2 rounded border border-white/20 hover:bg-black/40 transition">
              <FaUpload /> {photo ? photo.name : "Upload Image"}
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddReport}
                className="bg-green-600 px-6 py-2 rounded hover:opacity-80"
              >
                Submit
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-red-600 px-6 py-2 rounded hover:opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Reports Single Column */}
        <div className="flex flex-col gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-black/30 p-6 rounded-lg border border-white/10 shadow-md flex flex-col space-y-3"
            >
              {/* URL */}
              {report.url && (
                <a
                  href={report.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-300 font-semibold hover:underline text-lg flex items-center gap-2"
                >
                  <FaExternalLinkAlt /> {report.url}
                </a>
              )}

              {/* Description */}
              <p className="text-gray-300">{report.description}</p>

              {/* Photo */}
              {report.photoBase64 && (
                <div className="flex justify-center">
                  <img
                    src={report.photoBase64}
                    alt="Report"
                    className="w-full h-48 rounded object-cover mb-2 border  border-white/20 shadow-md"
                    style={{
                      maxHeight: "40vh",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              )}

              {/* Add/View Comments */}
              <div className="mt-2">
                <button
                  onClick={() =>
                    setShowComments((prev) => ({
                      ...prev,
                      [report.id]: !prev[report.id],
                    }))
                  }
                  className="flex items-center gap-2 text-blue-500 text-sm mb-2"
                >
                  <FaCommentDots />{" "}
                  {showComments[report.id]
                    ? "Hide Comments"
                    : "View / Add Comments"}
                </button>

                {showComments[report.id] && (
                  <div className="bg-black/20 p-2 rounded max-h-64 overflow-y-auto flex flex-col space-y-2">
                    {report.comments
                      ?.sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                      )
                      .map((c, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col p-3 rounded-lg shadow-md ${
                            idx % 2 === 0
                              ? "bg-green-900/40"
                              : "bg-blue-900/40"
                          }`}
                        >
                          <span className="font-semibold text-sm text-green-200">
                            {c.user}
                          </span>
                          <span className="text-gray-200">{c.text}</span>
                          <span className="text-xs text-gray-400 mt-0.5">
                            {new Date(c.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ))}
                    <div ref={(el) => (commentEndRefs.current[report.id] = el)} />
                    <div className="flex gap-2 mt-2">
                      <input
                        value={commentTexts[report.id] || ""}
                        onChange={(e) =>
                          setCommentTexts((prev) => ({
                            ...prev,
                            [report.id]: e.target.value,
                          }))
                        }
                        placeholder="Add a comment..."
                        className="flex-1 p-2 rounded border border-white/20 bg-black/30 text-white focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddComment(report.id)}
                        className="bg-green-600 px-4 py-2 rounded hover:opacity-80"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Created: {report.createdAt.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
