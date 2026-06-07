"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { Shield, BarChart3, Sliders, ArrowLeft } from "lucide-react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {


  const {user} = useContext(AuthContext)


  const pathname = usePathname();

  // Helper to check active state
  const isStatsActive = pathname === "/superadmin" || pathname.startsWith("/superadmin/aiusagestats");
  const isConfigActive = pathname.startsWith("/superadmin/aiconfig");

  return (
    <div className="flex h-screen overflow-hidden bg-[#050816] text-white">
      {/* Sidebar */}
      <aside className="w-64 h-full shrink-0 border-r border-white/5 bg-[#090d16] p-5 flex flex-col gap-6">
        
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Shield size={20} />
          </div>
          <span className="text-base font-black tracking-wide text-slate-200">
            Super Admin
          </span>
        </div>

        <nav className="flex flex-col gap-1.5">
          
          {/* Stats Link */}
          <Link
            href="/superadmin"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${
              isStatsActive
                ? "bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 rounded-r-2xl rounded-l-none pl-3.5"
                : "text-slate-400 hover:bg-white/[0.02] hover:text-white rounded-2xl"
            }`}
          >
            <BarChart3 size={18} className={isStatsActive ? "text-indigo-400" : "text-slate-400"} />
            <span>Stats</span>
          </Link>

          {/* AI Config Link */}
          <Link
            href="/superadmin/aiconfig"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${
              isConfigActive
                ? "bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 rounded-r-2xl rounded-l-none pl-3.5"
                : "text-slate-400 hover:bg-white/[0.02] hover:text-white rounded-2xl"
            }`}
          >
            <Sliders size={18} className={isConfigActive ? "text-indigo-400" : "text-slate-400"} />
            <span>AI Config</span>
          </Link>

          {/* Divider */}
          <div className="my-2 border-t border-white/5" />

          {/* Go Back Link */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide text-slate-400 hover:bg-white/[0.02] hover:text-white rounded-2xl transition-all duration-200"
          >
            <ArrowLeft size={18} className="text-slate-400" />
            <span>Back to Site</span>
          </Link>
        </nav>

        {/* User Profile Footer */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="h-10 w-10 rounded-full p-[2px] bg-white/10 shrink-0">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Profile"
                width={40}
                height={40}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-300">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-slate-200 truncate">
              {user?.name || "Super Admin"}
            </h3>
            <p className="text-xs text-slate-500 truncate">
              Manage platform
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;