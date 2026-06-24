import CyberMannequin from "@/components/ui/splineone";

// import CyberMannequin from "../components/3d-men";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-black">
      
      {/* Spline Background */}
      <div className="absolute inset-0">
        <CyberMannequin />
      </div>

      {/* Login Layer */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-20">
        
        <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-md">
          
          <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mb-8 text-zinc-300">
            Sign in to continue.
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />

            <button
              className="w-full rounded-xl bg-white py-3 font-medium text-black"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>

    </main>
  );
}