// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// // Reusable skeleton using the "invisible text" trick for exact dimensions
// const SkeletonButton = ({ text }: { text: string }) => {
//   return (
//     <div
//       className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg 
//       bg-zinc-900/60 border border-zinc-800 text-sm font-medium"
//     >
//       {/* Exact 22px Icon Placeholder */}
//       <div className="h-[22px] w-[22px] rounded-full bg-zinc-800 animate-pulse" />

//       {/* Exact Text Placeholder: Renders the real word invisibly to force perfect width/height */}
//       <span className="text-transparent bg-zinc-800 rounded animate-pulse select-none">
//         {text}
//       </span>
//     </div>
//   );
// };

// const NavbarSkeleton = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

//         {/* Original Logo Link Container - Displays completely clearly without loading effects */}
//         <Link
//           href="/"
//           className="flex items-center transition-opacity hover:opacity-90 group"
//         >
//           <div className="relative w-25 h-25 shrink-0">
//             <Image
//               src="/pixel.png"
//               alt="Veyra Logo"
//               fill
//               className="object-contain"
//               priority
//             />
//           </div>
//           <span
//             className="text-xl sm:text-2xl font-bold tracking-widest uppercase bg-gradient-to-r from-indigo-200 via-white to-violet-400 bg-clip-text text-transparent"
//             style={{ fontFamily: "var(--font-orbitron)", letterSpacing: "0.15em" }}
//           >
//             Veyra
//           </span>
//         </Link>

//         {/* Navigation Items Skeleton */}
//         <div className="flex items-center gap-4">
//           <SkeletonButton text="Admin" />
//           <SkeletonButton text="Price" />
//           <SkeletonButton text="Profile" />
//           <SkeletonButton text="Superadmin" />
//           <SkeletonButton text="LeaderBoard" />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavbarSkeleton;

"use client";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  User,
  ShieldCheck,
  IndianRupee,
  Trophy
} from "lucide-react";

import UserProfileModal from "./UserProfileModal";
import { AnimatePresence } from "framer-motion";

const NavbarSkeleton = () => {


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div
            
            className="relative h-8 w-36 transition-opacity hover:opacity-90"
          >
            <Image
              src="/LogoOfPostify.png"
              alt="Postify Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>



              <div className="flex items-center gap-4">
   
              <div
              
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <User size={22} className="text-zinc-500" />
                <span>Sign In</span>
              </div>
            



              
            <div
          
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg
            bg-zinc-900/60 border border-zinc-800 text-sm font-medium text-zinc-300
            hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100
              transition-all duration-200"
            >
              <LayoutGrid size={22} className="text-indigo-400" />
              <span>Admin</span>
            </div>




            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg
                bg-zinc-900/60 border border-zinc-800 text-sm font-medium text-zinc-300
                hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100
                transition-all duration-200"
            >

              <IndianRupee size={22} className="text-indigo-400" />
              <span>Price</span>
            </div>


   
              <button
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg
                bg-zinc-900/60 border border-zinc-800 text-sm font-medium text-zinc-300
                hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100
                transition-all duration-200"
              >
                <User size={22}
                  className="text-indigo-400"
                />
                <span>Profile</span>
              </button>
            


       
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg
                bg-zinc-900/60 border border-zinc-800 text-sm font-medium text-zinc-300
                hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100
                transition-all duration-200"
              >

                <ShieldCheck size={22}
                  className="text-green-400"
                />
                <span>Superadmin</span>

              </div>

            


            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg
                bg-zinc-900/60 border border-zinc-800 text-sm font-medium text-zinc-300
                hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100
                transition-all duration-200"
            >

              <Trophy size={22}
                className="text-indigo-400"
              />
              <span>LeaderBoard</span>

            </div>




          </div>
        </div>
      </nav>


    </>
  );
};

export default NavbarSkeleton;;