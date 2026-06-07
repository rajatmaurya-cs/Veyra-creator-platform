"use client";

import React from "react";
import Moment from "react-moment";

import {
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineBolt,
  HiOutlineClock,
} from "react-icons/hi2";

import {
  FiActivity,
  FiUser,
  FiShield,
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
    logs: any[];
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
      icon:  <HiOutlineCpuChip size={20} />,
    },
    {
      title: "Today's Requests",
      value: stats.todayRequests.toLocaleString(),
      icon: <HiOutlineUsers size={20} />,
    },
    {
      title: "Most Used AI",
      value: stats.mostUsedAI,
      icon: <FiActivity size={20} />,
    },
    {
      title: "Unique Users",
      value: stats.uniqueUsers.toLocaleString(),
      icon: <HiOutlineChartBar size={20} />,
    },
  ];

  return (
    <div className="w-full max-w-7xl px-4 md:px-6 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight">
          AI Usage Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Monitor AI requests, user engagement, and platform-wide activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-[#0b0f19]/40
              backdrop-blur-md
              p-6
              transition-all
              duration-300
              hover:border-indigo-500/30
              hover:shadow-[0_8px_30px_rgba(99,102,241,0.05)]
              hover:-translate-y-0.5
            "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-wide text-slate-400">
                {card.title}
              </p>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  text-indigo-400
                "
              >
                {card.icon}
              </div>
            </div>

            <h2 className="mt-5 text-3xl font-black text-white tracking-tight truncate">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        className="
          mt-10
          rounded-[2rem]
          border
          border-white/10
          bg-[#0b0f19]/40
          backdrop-blur-md
          p-6 md:p-8
        "
      >
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Recent AI Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            View the latest AI actions performed across the platform.
          </p>
        </div>

        {stats.logs.length === 0 ? (
          <div
            className="
              rounded-[2rem]
              border
              border-dashed
              border-white/10
              bg-white/[0.01]
              py-20
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-[#0b0f19]/40
                text-slate-400
              "
            >
              <HiOutlineClock size={28} />
            </div>

            <h3 className="text-lg font-bold text-white">
              No AI Activity Yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Activity logs will appear here once users start using AI features.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.logs.map((log, index) => (
              <div
                key={log._id}
                className="
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-5
                  transition-all
                  duration-200
                  hover:bg-white/[0.04]
                  hover:border-white/10
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-indigo-500/25
                      bg-indigo-500/15
                      text-indigo-300
                      font-bold
                    "
                  >
                    {log.userId?.fullName ? (
                      log.userId.fullName.charAt(0).toUpperCase()
                    ) : (
                      <FiUser size={16} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-200">
                      {log.userId?.fullName || "Unknown User"}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Activity #{String(index + 1).padStart(3, "0")}
                    </p>
                  </div>
                </div>

                {/* Center */}
                <div className="flex flex-wrap items-center gap-3">
                  {log.role === "admin" ? (
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-amber-500/20
                        bg-amber-500/10
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-amber-300
                      "
                    >
                      <FiShield size={12} />
                      Admin
                    </span>
                  ) : (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-lg
                        border
                        border-white/5
                        bg-white/[0.03]
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-slate-300
                      "
                    >
                      User
                    </span>
                  )}

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-indigo-500/20
                      bg-indigo-500/10
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-indigo-300
                    "
                  >
                    <HiOutlineCpuChip size={12} />
                    {log.action}
                  </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 text-sm text-slate-400 md:text-right font-medium">
                  <FiActivity size={14} className="text-slate-500" />

                  {log.createdAt ? (
                    <Moment format="MMM D, YYYY">
                      {log.createdAt}
                    </Moment>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analytics Section */}
      <div
        className="
          mt-10
          rounded-[2rem]
          border
          border-white/10
          bg-[#0b0f19]/40
          backdrop-blur-md
          p-8
        "
      >
        <div className="flex items-center gap-3">
          <MdOutlineAnalytics
            size={24}
            className="text-indigo-400"
          />

          <h2 className="text-2xl font-black tracking-tight text-white">
            AI Analytics
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Daily trends, user-wise activity, model usage statistics, growth metrics, and AI insights can be displayed here.
        </p>

        <div
          className="
            mt-8
            flex
            h-64
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-white/[0.01]
          "
        >
          <MdOutlineAnalytics
            size={42}
            className="text-slate-600 animate-pulse"
          />

          <p className="mt-4 text-sm font-bold text-slate-500 tracking-wide">
            Charts and analytics modules coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Client;