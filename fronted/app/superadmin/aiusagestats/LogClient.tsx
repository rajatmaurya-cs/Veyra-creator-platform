"use client";

import React from "react";
import Moment from "react-moment";
import Image from "next/image";

import {
  HiOutlineCpuChip,
  HiOutlineClock,
} from "react-icons/hi2";

import {
  FiActivity,
  FiShield,
  FiBox,
} from "react-icons/fi";

interface LogProps {
  data: {
    success: boolean;
    logs: any[];
  };
}

const LogClient = ({ data }: LogProps) => {
  const { logs } = data;

  return (
    <div className="w-full max-w-5xl pb-4 animate-in fade-in duration-500">
      <div 
        className="mt-2 overflow-hidden rounded-xl border bg-white"
        style={{ borderColor: "#e4e4e7" }}
      >
        <div 
          className="flex items-center justify-between border-b p-6"
          style={{ borderColor: "#e4e4e7" }}
        >
          <div>
            <div className="text-sm font-bold tracking-tight text-black">
              Recent Activity
            </div>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              Latest AI actions performed by users.
            </p>
          </div>
          <FiActivity className="text-black" size={18} />
        </div>

        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50">
            <div 
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border bg-white text-zinc-400"
              style={{ borderColor: "#e4e4e7" }}
            >
              <HiOutlineClock size={20} />
            </div>
            <div className="text-xs font-bold tracking-wide text-zinc-800">No Activity Yet</div>
            <p className="mt-2 text-xs text-zinc-500 font-semibold max-w-xs tracking-wide">
              User AI activity will appear here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {logs.map((log, index) => (
              <div
                key={log._id || index}
                className="group flex flex-col gap-5 border-b p-6 transition hover:bg-zinc-50 md:flex-row md:items-center md:justify-between last:border-none"
                style={{ borderColor: "#e4e4e7" }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="relative flex h-10 w-10 overflow-hidden rounded-lg border bg-zinc-50"
                    style={{ borderColor: "#e4e4e7" }}
                  >
                    <Image
                      src="/user.png"
                      fill
                      sizes="40px"
                      alt=""
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black tracking-tight">
                      {log.userId?.fullName || "Unknown User"}
                    </div>
                    <div className="mt-0.5 text-[9px] font-bold text-zinc-450 tracking-wide">
                      Activity #{index + 1}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {log.role === "admin" ? (
                    <span 
                      className="flex items-center gap-1.5 rounded border bg-black px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white uppercase"
                      style={{ borderColor: "#000000" }}
                    >
                      <FiShield size={10} /> {log.role}
                    </span>
                  ) : (
                    <span 
                      className="flex items-center gap-1.5 rounded border bg-zinc-100 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-zinc-850"
                      style={{ borderColor: "#e4e4e7" }}
                    >
                      <FiBox size={10} /> {log.role}
                    </span>
                  )}

                  <span 
                    className="flex items-center gap-1.5 rounded border bg-zinc-100 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-zinc-850"
                    style={{ borderColor: "#e4e4e7" }}
                  >
                    <HiOutlineCpuChip size={10} /> {log.action}
                  </span>
                </div>

                <div className="text-[10px] text-zinc-600 font-bold tracking-wide">
                  {log.createdAt && (
                    <Moment format="MMM DD, YYYY">
                      {log.createdAt}
                    </Moment>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogClient;
