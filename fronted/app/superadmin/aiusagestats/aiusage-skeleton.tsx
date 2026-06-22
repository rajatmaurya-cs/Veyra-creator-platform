import React from 'react';
import { FiAlertTriangle } from "react-icons/fi";

export function StatsSkeleton() {
  return (
    <div className="w-full max-w-5xl py-4 animate-in fade-in duration-500">
      {/* Alert Skeleton */}
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
        <FiAlertTriangle className="h-5 w-5 shrink-0 text-amber-600/50" />
        <div className="h-4 w-3/4 rounded bg-amber-200/50 animate-pulse"></div>
      </div>

      {/* Header Skeleton */}
      <div className="mb-10">
        <div className="h-8 w-64 rounded bg-zinc-200 animate-pulse"></div>
        <div className="mt-1.5 h-4 w-96 rounded bg-zinc-200 animate-pulse"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex h-[140px] flex-col justify-between overflow-hidden rounded-xl border bg-zinc-50 p-6"
            style={{ borderColor: "#e4e4e7" }}
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-zinc-200 animate-pulse"></div>
              <div className="h-9 w-9 rounded-lg border bg-zinc-200 animate-pulse" style={{ borderColor: "#e4e4e7" }}></div>
            </div>
            <div className="mt-6 h-8 w-20 rounded bg-zinc-200 animate-pulse"></div>
          </div>
        ))}
      </div>

    </div>
  );
}

export function LogSkeleton() {
  return (
    <div className="w-full max-w-5xl pb-4 animate-in fade-in duration-500">
      <div 
        className="mt-2 overflow-hidden rounded-xl border bg-white"
        style={{ borderColor: "#e4e4e7" }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between border-b p-6"
          style={{ borderColor: "#e4e4e7" }}
        >
          <div>
            <div className="h-5 w-32 rounded bg-zinc-200 animate-pulse"></div>
            <div className="mt-1 h-3 w-48 rounded bg-zinc-200 animate-pulse"></div>
          </div>
          <div className="h-5 w-5 rounded bg-zinc-200 animate-pulse"></div>
        </div>

        {/* Logs List */}
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-5 border-b p-6 md:flex-row md:items-center md:justify-between last:border-none"
              style={{ borderColor: "#e4e4e7" }}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-200 animate-pulse"></div>
                <div>
                  <div className="h-4 w-32 rounded bg-zinc-200 animate-pulse"></div>
                  <div className="mt-1 h-2 w-20 rounded bg-zinc-200 animate-pulse"></div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-7 w-16 rounded bg-zinc-200 animate-pulse"></div>
                <div className="h-7 w-24 rounded bg-zinc-200 animate-pulse"></div>
              </div>

              <div className="h-3 w-20 rounded bg-zinc-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
