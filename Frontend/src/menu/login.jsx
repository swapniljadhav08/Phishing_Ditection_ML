import Particles from "../components/Particles";

function Login() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
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
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Enter password"
            className="px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>
          <a href="/register" className="  ">Don't have an Account</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
