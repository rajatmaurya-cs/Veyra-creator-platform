"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  MessageSquare,
  Sparkles,
  SendHorizonal,
  Clock3,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

type Blog = {
  _id?: string;
  title: string;
  subTitle: string;
  content: string;
  category: string;
  image: string;
  isPublished: boolean;
  contentSource: string;
  createdBy?: {
    avatar?: string;
    fullName?: string;
  };
  aiAnalysis: {
    words: number;
    sentences: number;
    paragraphs: number;
    avgSentenceLength: string;
    totalScore: number;
    verdict: string;
  };
  createdAt: string;
  updatedAt: string;
};

type BlogClientProps = {
  blog: Blog;
};

const Blogclient = ({ blog }: BlogClientProps) => {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();
  const blogId = blog._id;

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/addcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            blogId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Comment failed");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Comment added");

      setComment("");

      queryClient.invalidateQueries({
        queryKey: ["comments", blogId],
      });
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to add comment");
    },
  });

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">

        {/* HERO */}
        <div className="mb-10">

          {/* CATEGORY */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">

            <span className="px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm font-medium backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              {blog.category}
            </span>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles size={15} className="text-violet-400" />
              AI Enhanced Article
            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 text-transparent bg-clip-text">
            {blog.title}
          </h1>

          {/* SUBTITLE */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mb-8">
            {blog.subTitle}
          </p>

          {/* META */}
          <div className="flex flex-wrap items-center gap-5">

            <div className="flex items-center gap-3">

              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 blur-md opacity-50 rounded-full" />

                <img
                  src={blog.createdBy?.avatar}
                  alt="Author"
                  className="relative w-12 h-12 rounded-full object-cover border border-white/10"
                />
              </div>

              <div>
                <p className="text-sm text-gray-300 font-medium">
                  {blog.createdBy?.fullName || "Unknown Author"}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarDays size={14} />

                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="flex items-center gap-3 flex-wrap">

              <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <FileText size={15} />
                  {blog.aiAnalysis.words} Words
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock3 size={15} />
                  {Math.ceil(blog.aiAnalysis.words / 200)} min read
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm text-emerald-300">
                  <Sparkles size={15} />
                  Score {blog.aiAnalysis.totalScore}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* IMAGE FIXED */}
        <div className="relative mb-16 group">

          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-violet-600/40 via-cyan-500/30 to-fuchsia-600/40 blur-2xl opacity-70 group-hover:opacity-100 transition duration-500" />

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black">

            <img
              src={blog.image}
              alt={blog.title}
              className="
                w-full
                h-auto
                max-h-[700px]
                object-contain
                md:object-cover
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto">

          {/* BLOG CONTENT */}
          <div className="relative mb-10">

            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl rounded-[30px] border border-white/10" />

            <div className="relative p-6 md:p-10">

              <div
                className="
                  rich-text
                  prose prose-invert
                  prose-p:text-gray-300
                  prose-headings:text-white
                  prose-strong:text-white
                  prose-a:text-cyan-400
                  prose-img:rounded-2xl
                  max-w-none
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

            </div>
          </div>

          {/* AI ANALYSIS MOVED BELOW CONTENT */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-8 mb-10">

            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="text-violet-400" size={22} />

              <h3 className="text-2xl font-semibold">
                AI Analysis
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-gray-400 mb-2">
                  Words
                </p>

                <h4 className="text-2xl font-bold text-white">
                  {blog.aiAnalysis.words}
                </h4>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-gray-400 mb-2">
                  Sentences
                </p>

                <h4 className="text-2xl font-bold text-white">
                  {blog.aiAnalysis.sentences}
                </h4>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-gray-400 mb-2">
                  Paragraphs
                </p>

                <h4 className="text-2xl font-bold text-white">
                  {blog.aiAnalysis.paragraphs}
                </h4>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-gray-400 mb-2">
                  Avg Length
                </p>

                <h4 className="text-lg font-semibold text-white">
                 {Math.round(Number(blog.aiAnalysis.avgSentenceLength))} Words
                </h4>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <p className="text-sm text-emerald-200 mb-2">
                  Verdict
                </p>

                <h4 className="text-lg font-semibold text-emerald-300">
                  {blog.aiAnalysis.verdict}
                </h4>
              </div>

            </div>
          </div>

          {/* COMMENT SECTION MOVED TO BOTTOM */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-8">

            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="text-cyan-400" size={22} />

              <h2 className="text-2xl font-semibold">
                Add Your Comment
              </h2>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this article..."
              className="
                w-full
                min-h-[180px]
                rounded-[24px]
                bg-white/[0.04]
                border border-white/10
                p-5
                text-gray-200
                placeholder:text-gray-500
                outline-none
                resize-none
                focus:border-cyan-500/50
                focus:bg-white/[0.06]
                transition-all duration-300
              "
            />

            <button
              onClick={() => addCommentMutation.mutate()}
              disabled={addCommentMutation.isPending}
              className="
                mt-6
                rounded-2xl
                bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600
                px-6 py-3
                text-sm font-semibold
                text-white
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-2xl hover:shadow-cyan-500/20
                disabled:opacity-50
                disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {addCommentMutation.isPending ? (
                "Posting..."
              ) : (
                <>
                  Post Comment
                  <SendHorizonal size={16} />
                </>
              )}
            </button>

           <div
  className="
    mt-6
    flex items-start gap-4
    rounded-2xl
    border border-amber-500/20
    bg-amber-500/5
    backdrop-blur-xl
    px-5 py-4
  "
>

  {/* ICON */}
  <div
    className="
      shrink-0
      w-10 h-10
      rounded-xl
      bg-amber-500/10
      border border-amber-500/20
      flex items-center justify-center
    "
  >
    <Sparkles
      size={18}
      className="text-amber-300"
    />
  </div>

 
  <div>

    <h3 className="text-sm md:text-base font-semibold text-amber-200 mb-1">
      AI Moderated Comments
    </h3>

    <p className="text-sm leading-6 text-amber-100/70">
      Comments are automatically reviewed by our AI moderation system.
      Spam, abusive, toxic, or inappropriate comment will be rejected
      instantly.
    </p>

  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogclient;