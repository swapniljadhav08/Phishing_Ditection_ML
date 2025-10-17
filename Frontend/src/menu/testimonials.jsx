import React from "react";
import SpotlightCard from "../components/SpotlightCard";

const testimonials = [
  {
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "@Antashshrivast2",
    text: "Just used PhishGuard for my website. This is amazing, it instantly detected suspicious links that could have compromised my users.",
  },
  {
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "@syskey_dmg",
    text: "Really impressed by PhishGuard. The dashboard is clean, intuitive, and helps me stay safe online.",
  },
  {
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "@makwanadeepam",
    text: "PhishGuard saved me from a phishing attack today. Highly recommend for anyone browsing online.",
  },
  {
    avatar: "https://i.pravatar.cc/40?img=4",
    name: "@gregberge_",
    text: "A stellar tool for detecting phishing links before they harm you. Absolutely love it!",
  },
];

export default function Testimonials() {
  return (
    <div className="shadow-2xl rounded-xl p-6 transition-transform backdrop-blur-xl border border-white/10 transform hover:scale-105 hover:shadow-3xl">
      <section className="py-12 w-full max-w-[1140px] mx-auto overflow-hidden rounded-2xl">
        <div className="marquee-container">
          <h2 className="text-2xl md:text-4xl bg-gradient-to-r from-yellow-400 via-lime-400 to-lime-500 bg-clip-text text-transparent font-bold text-center mb-6 md:mb-8">
            Loved by Users Worldwide
          </h2>
          <p className="text-center text-green-600 text-base md:text-xl mb-8 md:mb-12">
            See what users are saying about PhishGuard
          </p>
          <div className="marquee-content marquee-right-left">
            <div className="marquee-inner">
              {testimonials.map((t, index) => (
                <SpotlightCard
                  key={index}
                  className="custom-spotlight-card"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <div className="marquee-card backdrop-blur-xl border border-white/10">
                    <div className="marquee-card-header flex items-center gap-2 mb-2">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      />
                      <span className="font-semibold text-white">{t.name}</span>
                    </div>
                    <p className="text-white text-sm md:text-base break-words">{t.text}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
            <div className="marquee-inner">
              {testimonials.map((t, index) => (
                <SpotlightCard
                  key={"dup-" + index}
                  className="custom-spotlight-card"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <div className="marquee-card backdrop-blur-xl border border-white/10">
                    <div className="marquee-card-header flex items-center gap-2 mb-2">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      />
                      <span className="font-semibold text-white">{t.name}</span>
                    </div>
                    <p className="text-white text-sm md:text-base break-words">{t.text}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1140px] mx-auto overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content marquee-left-right">
            <div className="marquee-inner">
              {testimonials.map((t, index) => (
                <SpotlightCard
                  key={index}
                  className="custom-spotlight-card"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <div className="marquee-card backdrop-blur-xl border border-white/10">
                    <div className="marquee-card-header flex items-center gap-2 mb-2">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      />
                      <span className="font-semibold text-white">{t.name}</span>
                    </div>
                    <p className="text-white text-sm md:text-base break-words">{t.text}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
            <div className="marquee-inner">
              {testimonials.map((t, index) => (
                <SpotlightCard
                  key={"dup-" + index}
                  className="custom-spotlight-card"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <div className="marquee-card backdrop-blur-xl border border-white/10">
                    <div className="marquee-card-header flex items-center gap-2 mb-2">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      />
                      <span className="font-semibold text-white">{t.name}</span>
                    </div>
                    <p className="text-white text-sm md:text-base break-words">{t.text}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
