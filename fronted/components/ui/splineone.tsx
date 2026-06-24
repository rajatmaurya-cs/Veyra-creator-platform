
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  { ssr: false }
);

export default function CyberMannequin() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0b0d11]">
          <div className="relative flex items-center justify-center">
            {/* Outer rotating ring */}
            <div className="absolute h-32 w-32 animate-[spin_3s_linear_infinite] rounded-full border-t-2 border-r-2 border-indigo-500/40"></div>
            {/* Inner rotating ring */}
            <div className="absolute h-24 w-24 animate-[spin_2s_linear_infinite_reverse] rounded-full border-b-2 border-l-2 border-violet-500/80"></div>
            {/* Center pulse dot */}
            <div className="h-3 w-3 animate-pulse rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <span
              className="animate-pulse bg-gradient-to-r from-indigo-300 via-white to-violet-400 bg-clip-text text-sm font-bold tracking-[0.3em] text-transparent uppercase"
            >
              Initializing
            </span>
            <span className="text-[10px] text-[#4b5563] tracking-widest">
              LOADING ASSETS...
            </span>
          </div>
        </div>
      )}

      <Spline
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}


