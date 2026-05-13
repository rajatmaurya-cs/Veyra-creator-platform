"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  FileText,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        
        {/* BADGE */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-gray-300 backdrop-blur-xl">
          <Sparkles size={16} className="text-purple-400" />

          <span>
            AI Powered Blogging Experience
          </span>
        </div>

        {/* HEADING */}
        <h1 className="max-w-5xl text-5xl font-black leading-[1.1] tracking-tight md:text-7xl xl:text-8xl">
          Write.
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {" "}Summarize.
          </span>
          <br />
          Publish with
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}Postify AI
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-gray-400 md:text-xl">
          Create blogs faster with AI generation, summarize articles in
          seconds, moderate comments intelligently, and explore modern content
          crafted for developers, creators, and startups.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          
          <Link
            href="/summarizer"
            className="group flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-gray-200"
          >
            Start Summarizing

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/Home/blogs"
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-medium text-gray-200 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            Explore Blogs
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
              <BrainCircuit size={28} className="text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold">
              AI Blog Generation
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Generate complete high-quality blogs instantly with powerful AI
              assistance.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
              <Sparkles size={28} className="text-cyan-400" />
            </div>

            <h3 className="text-xl font-semibold">
              Smart Summarization
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Read long articles in under a minute with intelligent AI
              summaries.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10">
              <FileText size={28} className="text-pink-400" />
            </div>

            <h3 className="text-xl font-semibold">
              Premium Publishing
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Publish beautifully designed blogs with modern UI and smooth user
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;