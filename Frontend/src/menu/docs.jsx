import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";

function ShowCase() {


  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start py-12">

      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#35f531", "#23dc42"]}
          particleCount={250}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10 w-full max-w-lg backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl mb-8">
        <h1>hello</h1>
      </div>
      
    </div>
  );
}

export default ShowCase;
