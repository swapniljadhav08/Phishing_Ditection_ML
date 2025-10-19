import { useState } from "react";
import { Link } from "react-router-dom";
import Particles from "../components/Particles"; 
import Header from "./Header";

// ------- Confidence Pie Component -------
function ConfidencePie({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width="150" height="150">
      <circle
        r={radius}
        cx="75"
        cy="75"
        fill="transparent"
        stroke="#555"
        strokeWidth="15"
      />
      <circle
        r={radius}
        cx="75"
        cy="75"
        fill="transparent"
        stroke="#35f531"
        strokeWidth="15"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap="round"
        transform="rotate(-90 75 75)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from={circumference}
          to={offset}
          dur="1s"
          fill="freeze"
        />
      </circle>
      <text x="75" y="85" textAnchor="middle" fill="white" fontSize="20px" fontWeight="bold">
        {score}%
      </text>
    </svg>
  );
}

// ------- Sections Definition -------
const sections = {
  Overview: {
    title: "🔍 Overview of Phishing Detection System",
    content: (
      <>
        <p className="text-lg leading-relaxed">
          A phishing detection system uses machine learning techniques to identify phishing websites by analyzing various URL features.
          Phishing websites mimic legitimate ones to steal sensitive data like passwords or financial information.
          Unlike rule-based systems that rely on static patterns, this system learns dynamically from data to adapt to evolving phishing strategies.
        </p>
        <div className="mt-4 p-4 bg-green-50 text-black rounded shadow">
          ✅ Real-Time Detection &nbsp;&nbsp; ✅ AI-Powered Decision Making &nbsp;&nbsp; ✅ Up to 94% Accuracy
        </div>
      </>
    ),
  },
  "Step 1: URL Input & Validation": {
    title: "🌐 Step 1: URL Input & Validation",
    content: (
      <>
        <p>
          Users enter a website URL into the interface, which is sanitized and validated for proper syntax. Invalid URLs trigger error messages.
          Proper validation ensures only legitimate-looking URLs are processed.
        </p>
        <ul className="list-disc ml-6">
          <li>User Input Interface</li>
          <li>Syntax & Format Verification (scheme, domain, path)</li>
          <li>Response Handling (error for invalid, proceed for valid)</li>
        </ul>
        <svg width="350" height="120" className="mt-6">
          <rect width="200" height="40" x="75" y="10" fill="none" stroke="white" strokeWidth="2" />
          <text x="175" y="35" textAnchor="middle" fill="white">User Enters URL</text>
          <line x1="175" y1="50" x2="175" y2="80" stroke="white" strokeWidth="2" />
          <rect width="200" height="40" x="75" y="80" fill="none" stroke="white" strokeWidth="2" />
          <text x="175" y="105" textAnchor="middle" fill="white">URL Validation</text>
        </svg>
      </>
    ),
  },
  "Step 2: Feature Extraction (DNS, WHOIS, URL Patterns)": {
    title: "🧬 Step 2: Feature Extraction",
    content: (
      <>
        <p>
          The system extracts meaningful features from the URL and domain to identify phishing patterns. Features are structural, lexical, and behavioral.
        </p>
        <ul className="list-disc ml-6">
          <li>Lexical Features: URL length, special symbols (@, -, _, %), IP usage, subdomain count</li>
          <li>Domain & WHOIS Features: Domain age, registration type, DNS inconsistencies</li>
          <li>Content/Behavior Features: Missing titles, insecure forms, dynamic page behaviors</li>
        </ul>

        {/* Animated Feature Bars */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Key Feature Extraction Scores</h3>
          {[
            { name: "Lexical Features", value: 80, color: "#35f531" },
            { name: "Domain & WHOIS Features", value: 70, color: "#23dc42" },
            { name: "Content/Behavior Features", value: 60, color: "#00bfff" },
          ].map((feature) => (
            <div key={feature.name} className="mb-3">
              <span>{feature.name} - {feature.value}%</span>
              <div className="w-full bg-gray-700 rounded h-4 mt-1">
                <div
                  className="h-4 rounded transition-all duration-1000"
                  style={{ width: `${feature.value}%`, backgroundColor: feature.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-800 rounded shadow">
          Total Features Selected: 34 out of 48 (UrlLength, NumDash, AtSymbol, RandomString, IframeOrFrame, NumSensitiveWords, NoHttps)
        </div>
      </>
    ),
  },
  "Step 3: Machine Learning Prediction": {
    title: "🤖 Step 3: Machine Learning Prediction",
    content: (
      <>
        <p>
          Extracted features are fed into trained machine learning models: Random Forest, SVM, and Logistic Regression.
        </p>
        <ul className="list-disc ml-6">
          <li>Random Forest: Ensemble of decision trees, accuracy 94.1%</li>
          <li>SVM: RBF kernel, accuracy 93.25%</li>
          <li>Logistic Regression: Linear baseline, accuracy 90.65%</li>
        </ul>
        <div className="mt-4 p-4 bg-yellow-50 text-black rounded shadow">
          Evaluation Metrics: Accuracy, Precision, Recall, F1-score, ROC-AUC, Confusion Matrix
        </div>

        {/* ML Pipeline Horizontal Flowchart */}
        <div className="mt-6 flex justify-center">
          <svg width="700" height="180">
            <rect x="20" y="20" width="120" height="50" stroke="white" fill="#1a1a1a" strokeWidth="2" rx="8"/>
            <text x="80" y="50" fill="white" fontSize="12" textAnchor="middle">URL Input</text>
            <line x1="140" y1="45" x2="180" y2="45" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="180" y="20" width="140" height="50" stroke="white" fill="#2c2c2c" strokeWidth="2" rx="8"/>
            <text x="250" y="50" fill="white" fontSize="12" textAnchor="middle">Feature Extraction</text>
            <line x1="320" y1="45" x2="360" y2="45" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="360" y="20" width="140" height="50" stroke="white" fill="#1a1a1a" strokeWidth="2" rx="8"/>
            <text x="430" y="50" fill="white" fontSize="12" textAnchor="middle">ML Models</text>
            <line x1="500" y1="45" x2="540" y2="45" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="540" y="20" width="120" height="50" stroke="white" fill="#2c2c2c" strokeWidth="2" rx="8"/>
            <text x="600" y="50" fill="white" fontSize="12" textAnchor="middle">Result</text>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="white" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Model Accuracy Bars */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Model Accuracy Comparison</h3>
          {["Random Forest", "SVM", "Logistic Regression"].map((model, idx) => {
            const accuracies = [94.1, 93.25, 90.65];
            const width = accuracies[idx];
            return (
              <div key={model} className="mb-3">
                <span>{model} - {width}%</span>
                <div className="w-full bg-gray-700 rounded h-4 mt-1">
                  <div
                    className="bg-green-400 h-4 rounded transition-all duration-1000"
                    style={{ width: `${width}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    ),
  },
  "Step 4: Result & Confidence Score": {
    title: "📊 Step 4: Final Result & Confidence Score",
    content: (
      <>
        <p>
          The system outputs a probability score representing the likelihood of phishing. A threshold of 0.5 classifies URLs.
        </p>
        <div className="flex flex-col items-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Confidence Score</h3>
          <ConfidencePie score={92} />
          <div className="mt-3 text-white font-semibold">92% Confidence → Likely Phishing</div>
        </div>
      </>
    ),
  },
  "Visual Flow Diagram": {
    title: "📈 Visual Flow Diagram",
    content: (
      <div className="flex justify-center mt-4">
        <svg width="400" height="300">
          <rect x="100" y="10" width="200" height="40" stroke="white" fill="none" strokeWidth="2" />
          <text x="200" y="35" fill="white" textAnchor="middle">URL Input</text>
          <line x1="200" y1="50" x2="200" y2="90" stroke="white" strokeWidth="2" />
          <rect x="100" y="90" width="200" height="40" stroke="white" fill="none" strokeWidth="2" />
          <text x="200" y="115" fill="white" textAnchor="middle">Feature Extraction</text>
          <line x1="200" y1="130" x2="200" y2="170" stroke="white" strokeWidth="2" />
          <rect x="100" y="170" width="200" height="40" stroke="white" fill="none" strokeWidth="2" />
          <text x="200" y="195" fill="white" textAnchor="middle">ML Prediction</text>
          <line x1="200" y1="210" x2="200" y2="250" stroke="white" strokeWidth="2" />
          <rect x="100" y="250" width="200" height="40" stroke="white" fill="none" strokeWidth="2" />
          <text x="200" y="275" fill="white" textAnchor="middle">Result & Confidence</text>
        </svg>
      </div>
    ),
  },
  "Real API Example": {
    title: "🧪 Real API Example",
    content: (
      <>
        <p>Example JSON request to the backend:</p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded mt-4 overflow-auto text-sm">
{`POST /predict
{
  "url": "https://example.com/login"
}

Response:
{
  "url": "https://emojipedia.org/left-arrow",
  "features": {
    "NumDots": 1,
    "SubdomainLevel": 0,
    "PathLevel": 1,
    "UrlLength": 33,
    "HostnameLength": 14,
    "PathLength": 11,
    "QueryLength": 0,
    "NumDash": 1,
    "NumDashInHostname": 0,
    "AtSymbol": 0,
    "TildeSymbol": 0,
    "NumUnderscore": 0,
    "NumPercent": 0,
    "NumQueryComponents": 0,
    "NumAmpersand": 0,
    "NumHash": 0,
    "NumNumericChars": 0,
    "DoubleSlashInPath": 0,
    "NoHttps": 0,
    "HttpsInHostname": 0,
    "IpAddress": 0,
    "RandomString": 0,
    "DomainInSubdomains": 0,
    "DomainInPaths": 0,
    "NumSensitiveWords": 0,
    "EmbeddedBrandName": 0,
    "IframeOrFrame": 0,
    "SubmitInfoToEmail": 0,
    "InsecureForms": 0,
    "RelativeFormAction": 0,
    "ExtFormAction": 0,
    "AbnormalFormAction": 1,
    "MissingTitle": 0,
    "ExtFavicon": 1
  },
  "results": {
    "svm": {
      "model": "svm",
      "prediction": 0,
      "label": "Legitimate",
      "probability": 0.15624913022068068
    },
    "logistic_regression": {
      "model": "logistic_regression",
      "prediction": 0,
      "label": "Legitimate",
      "probability": 0.4256398349042826
    },
    "random_forest": {
      "model": "random_forest",
      "prediction": 0,
      "label": "Legitimate",
      "probability": 0.335
    }
  },
  "majority_vote": {
    "model": "majority_vote",
    "prediction": 0,
    "label": "Legitimate",
    "probability": 0.30562965504165446
  }
}`}
        </pre>
      </>
    ),
  },
  "Why This System is Important": {
    title: "🚨 Why This System is Important",
    content: (
      <>
        <p>
          Adaptable to evolving phishing tactics, the system reduces false positives and enables real-time detection.
        </p>
        <div className="mt-4 p-4 bg-blue-50 text-black rounded shadow">
          🌍 Protects millions of users globally <br />
          💰 Prevents financial loss <br />
          🔐 Enhances cybersecurity
        </div>
      </>
    ),
  },
  "Advantages Over Traditional Methods": {
    title: "🌟 Advantages Over Traditional Methods",
    content: (
      <table className="mt-4 w-full text-left border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">Aspect</th>
            <th className="border border-gray-600 px-4 py-2">Traditional Detection</th>
            <th className="border border-gray-600 px-4 py-2">ML-Based Detection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-600 px-4 py-2">Method</td>
            <td className="border border-gray-600 px-4 py-2">Keyword/rule matching</td>
            <td className="border border-gray-600 px-4 py-2">Pattern learning from data</td>
          </tr>
          <tr className="bg-gray-800">
            <td className="border border-gray-600 px-4 py-2">Adaptability</td>
            <td className="border border-gray-600 px-4 py-2">Poor against evolving attacks</td>
            <td className="border border-gray-600 px-4 py-2">Learns continuously</td>
          </tr>
          <tr>
            <td className="border border-gray-600 px-4 py-2">Accuracy</td>
            <td className="border border-gray-600 px-4 py-2">Moderate</td>
            <td className="border border-gray-600 px-4 py-2">Higher (up to 94.1%)</td>
          </tr>
          <tr className="bg-gray-800">
            <td className="border border-gray-600 px-4 py-2">Scalability</td>
            <td className="border border-gray-600 px-4 py-2">Limited</td>
            <td className="border border-gray-600 px-4 py-2">Handles large datasets</td>
          </tr>
          <tr>
            <td className="border border-gray-600 px-4 py-2">Maintenance</td>
            <td className="border border-gray-600 px-4 py-2">Manual rule updates</td>
            <td className="border border-gray-600 px-4 py-2">Self-improving</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  "Future Scope & Improvements": {
    title: "🚀 Future Scope & Improvements",
    content: (
      <>
        <p>Potential improvements include:</p>
        <ul className="list-disc ml-6">
          <li>Deep Learning Integration (CNN, LSTM for hidden URL patterns)</li>
          <li>Real-Time Browser Extension Protection</li>
          <li>NLP Analysis of webpage content</li>
          <li>Dynamic dataset expansion for emerging threats</li>
          <li>Visualization dashboard with analytics</li>
        </ul>
      </>
    ),
  },
};

// ------- Main Component -------
function HowItWork() {
  const [selected, setSelected] = useState("Overview");

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#35f531", "#23dc42"]}
          particleCount={200}
          particleSpread={20}
          speed={0.3}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 p-4 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold text-green-400">Phishing Detection System</h1>
        <Link to="/">
          <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">
            <p>← Back</p>
          </button> 
        </Link> 
      </nav>

      {/* Sidebar + Content */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="w-72 p-4 h-[calc(100vh-64px)] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Documentation</h2>
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`block w-full text-left mb-2 px-4 py-2 rounded ${
                selected === key ? "bg-green-600" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {key}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 h-[calc(100vh-64px)] overflow-y-auto">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            {sections[selected].title}
          </h1>
          <div className="text-lg">{sections[selected].content}</div>
        </main>
      </div>
    </div>
  );
}

export default HowItWork;
