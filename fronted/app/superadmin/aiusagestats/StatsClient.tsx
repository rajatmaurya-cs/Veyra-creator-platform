"use client";

import React from "react";
import Moment from "react-moment";
import Image from "next/image";

import {
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineClock,
} from "react-icons/hi2";

import {
  FiActivity,
  FiShield,
  FiBox,
  FiAlertTriangle,
} from "react-icons/fi";

import {
  MdOutlineAnalytics,
} from "react-icons/md";

type AIStatsData = {
  success: boolean;
  stats: {
    totalRequests: number;
    todayRequests: number;
    mostUsedAI: string;
    uniqueUsers: number;
  };
};

interface ClientProps {
  data: AIStatsData;
}

const Client = ({ data }: ClientProps) => {
  const { stats } = data;

  const cards = [
    {
      title: "Total Requests",
      value: stats.totalRequests.toLocaleString(),
      icon: <HiOutlineCpuChip size={22} />,
    },
    {
      title: "Today's Requests",
      value: stats.todayRequests.toLocaleString(),
      icon: <HiOutlineUsers size={22} />,
    },
    {
      title: "Most Used AI",
      value: stats.mostUsedAI,
      icon: <FiActivity size={22} />,
    },
    {
      title: "Unique Users",
      value: stats.uniqueUsers.toLocaleString(),
      icon: <HiOutlineChartBar size={22} />,
    },
  ];


  return (
    <div className="w-full max-w-5xl py-4 animate-in fade-in duration-500">
      {}
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-amber-800 backdrop-blur-sm">
        <FiAlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
        <div className="text-xs font-semibold tracking-wide">
          Superadmin is only for demonstration. Any action is prohibited.
        </div>
      </div>

      {}
      <div className="mb-10">
        <div className="text-2xl font-bold tracking-tight text-black">
          AI Usage Dashboard
        </div>
        <p className="mt-1.5 text-xs text-zinc-650 font-bold tracking-wide">
          Track AI generation, user activity and platform usage insights across VEYRA.
        </p>
      </div>

      {}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-zinc-50 p-6 transition-all duration-300 hover:border-zinc-400"
            style={{ borderColor: "#e4e4e7" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-wide text-zinc-700">{card.title}</p>
              <div 
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-zinc-850 transition-colors duration-300 group-hover:text-black group-hover:border-zinc-400"
                style={{ borderColor: "#e4e4e7" }}
              >
                {card.icon}
              </div>
            </div>
            <div className="mt-6 text-3xl font-bold text-black tracking-tight truncate">
              {card.value}
            </div>
          </div>
        ))}
      </div>


     
    </div>
  );
};

export default Client;