import Particles from "./components/Particles"
import Header from "./menu/Header"
import Testimonials from "./menu/testimonials"
import SpotlightCard from './components/SpotlightCard'
import CountUp from "./components/CountUp"
import Footer from "./menu/footer"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#35f531", "#23dc42"]}
          particleCount={400}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10 w-full">
        <section>
          <Header />
        </section>
        <section className="flex flex-col gap-10 items-center justify-center px-4 py-20 text-center">
          <div className="flex flex-col items-center justify-center text-5xl md:text-8xl">
            <h1 className="slide-in-bck-bottom-normal">Protect Yourself</h1>
            <h1 className="slide-in-bck-bottom-normal">from Phishing Now</h1>
          </div>
          <div className="flex flex-col items-center justify-center text-lg md:text-3xl max-w-2xl md:max-w-3xl">
            <p className="slide-in-bck-left-normal">Detect and block phishing websites instantly. Protect your</p>
            <p className="slide-in-bck-left-normal">clicks, your data, and your peace of mind.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center text-xl md:text-2xl">
            <div className="slide-in-bck-right-normal">
              <Link  to="/PhishGuardPage">
              <button className="h-[60px] w-[260px] bg-gradient-to-r from-yellow-300 via-lime-600 to-lime-700 rounded-4xl cursor-pointer">
                Check a URL Now
              </button>
              </Link>
            </div>
            <div className="slide-in-bck-right-normal">
              <SpotlightCard className="flex flex-col items-center justify-center custom-spotlight-card h-[60px] w-[260px]" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Link to="/howItWork">
                <button className="h-[50px] w-[240px] cursor-pointer">Learn How It Works</button>
                </Link>                
              </SpotlightCard>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-10 px-4 py-16">
          <SpotlightCard className="flex flex-col items-center justify-center custom-spotlight-card h-[240px] w-full md:w-[450px]" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-lime-400 to-lime-500 bg-clip-text text-transparent">
              <CountUp from={0} to={100} separator="," direction="up" duration={1} className="count-up-text" />%
            </div>
            <h1 className="font-bold text-2xl md:text-3xl">Free & Open Source</h1>
            <h2 className="text-md md:text-xl">Loved by developers around the world</h2>
          </SpotlightCard>
          <SpotlightCard className="flex flex-col items-center justify-center custom-spotlight-card h-[240px] w-full md:w-[450px]" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-lime-400 to-lime-500 bg-clip-text text-transparent">
              <CountUp from={0} to={95} separator="," direction="up" duration={1} className="count-up-text" />%
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-xl md:text-2xl">Detection Accuracy with</h1>
              <h1 className="font-bold text-xl md:text-2xl">AI-powered Scanning</h1>
              <h2 className="text-sm md:text-md">Our advanced AI models analyze suspicious URLs and</h2>
              <h2 className="text-sm md:text-md">domains to give you reliable protection.</h2>
            </div>
          </SpotlightCard>
          <SpotlightCard className="flex flex-col items-center justify-center custom-spotlight-card h-[240px] w-full md:w-[450px]" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-lime-400 to-lime-500 bg-clip-text text-transparent">
              <CountUp from={0} to={150} separator="," direction="up" duration={1} className="count-up-text" />+
            </div>
            <h1 className="font-bold text-xl md:text-2xl">Verified Phishing URLs</h1>
            <h1 className="font-bold text-xl md:text-2xl">Blocked Daily</h1>
            <h2 className="text-sm md:text-md">Stay safe with our constantly updated database that tracks</h2>
            <h2 className="text-sm md:text-md">and blocks new phishing threats every day.</h2>
          </SpotlightCard>
        </section>
        <section className="flex items-center justify-center h-auto py-12 px-4">
          <div className="w-full max-w-5xl">
            <Testimonials />
          </div>
        </section>
        <section>
          <div className="py-12 w-full max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  1. What is phishing and why is it dangerous?
                </summary>
                <p className="mt-2 text-gray-300">
                  Phishing is a cyber-attack where attackers trick users into sharing sensitive data like passwords, credit card numbers, or banking details. It can lead to identity theft and financial loss.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  2. How does PhishGuard detect phishing websites?
                </summary>
                <p className="mt-2 text-gray-300">
                  We use AI-powered algorithms, DNS analysis, and WHOIS data checks to detect suspicious patterns and block fraudulent websites in real-time.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  3. Is PhishGuard free to use?
                </summary>
                <p className="mt-2 text-gray-300">
                  Yes! Our basic phishing detection service is free, and you can start protecting yourself online instantly.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  4. Do I need to install anything?
                </summary>
                <p className="mt-2 text-gray-300">
                  No installation is required. Just enter a URL in our platform, and we’ll analyze it for you in seconds.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  5. How accurate is PhishGuard?
                </summary>
                <p className="mt-2 text-gray-300">
                  Our detection accuracy is over 95%, thanks to continuous AI model training and real-time phishing database updates.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  6. Can businesses use PhishGuard?
                </summary>
                <p className="mt-2 text-gray-300">
                  Absolutely! PhishGuard is designed for both individuals and businesses to safeguard against phishing attacks.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  7. How often is the phishing database updated?
                </summary>
                <p className="mt-2 text-gray-300">
                  Our system updates continuously throughout the day to ensure maximum protection against newly emerging threats.
                </p>
              </details>
              <details className="group border-b pb-4">
                <summary className="cursor-pointer font-semibold text-lg text-white transition-colors group-open:text-green-500">
                  8. How can I report a phishing website?
                </summary>
                <p className="mt-2 text-gray-300">
                  You can report suspicious websites directly on our platform. Our team will review and update the database quickly.
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="mb-20 px-4">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-12 p-12 bg-gradient-to-r from-amber-300 via-lime-400 to-lime-600 rounded-3xl border-t backdrop-blur-xl border border-white/10">
            <h2 className="text-3xl md:text-4xl text-gray-700 font-bold">Start Exploring</h2>
            <h2 className="text-md text-gray-700 font-bold">Stay Safe Online, For Free</h2>
            <p className="text-lg text-gray-600 mt-6">Quick setup, easy to use, and completely free to start securing your digital presence.</p>
            <p className="text-lg font-bold text-gray-600 mb-6">— One Click Away</p>
            <Link to="/PhishGuardPage">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 via-lime-400 to-lime-600 text-gray-600 font-semibold rounded-full transition cursor-pointer">Get Started For Free</button>
            </Link>
            
          </div>
        </section>
        <section>
          <Footer/>
        </section>
      </div>
    </div>
  )
}

export default Home
