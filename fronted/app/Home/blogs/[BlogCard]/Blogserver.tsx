import React from "react";
import Blogclient from "./Blogclient";

type Blog = {
  _id: string;
  title: string;
  subTitle: string;
  content: string;
  category: string;
  image: string;
  isPublished: boolean;
  contentSource: string;
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
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
  };
  likes?: string[];
};

type BlogResponse = {
  success: boolean;
  blog: Blog;
  message?: string;
};

type BlogServerProps = {
  Id: string;
};

const Blogserver = async ({ Id }: BlogServerProps) => {

  const start: number = Date.now();

  // ✅ Server components bypass the Next.js rewrite proxy.
  // We must call the backend URL directly (server-to-server).
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/blogbyid/${Id}?blogId=${Id}`,
    {
      next: {
        revalidate: 300, // 5 minutes
      },
    }
  );

  const end: number = Date.now();
  console.log("The Time taken to fetch blogs:", ((end - start) || 0) / 1000);

  // ✅ Guard: handle non-2xx HTTP responses (404, 500, etc.)
  // Without this check, a 404/500 response body still gets parsed and data.blog is undefined
  if (!res.ok) {
    console.error(`Blog fetch failed with HTTP status: ${res.status} for Id: ${Id}`);
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <p className="text-gray-400 text-lg">Blog not found or failed to load.</p>
      </div>
    );
  }

  const data: BlogResponse = await res.json();

  console.log("The blog likes are:", data.blog?.likes);
  console.log("Blog fetch success:", data.success, "| Has blog:", !!data.blog);

  // ✅ Guard: handle 2xx responses that don't include blog data
  // e.g. backend returns { success: false, message: "Blog not found" } with 200 status
  // This was the direct crash cause: Blogclient received blog={undefined} → blog._id threw
  if (!data.blog) {
    console.error(`API returned no blog. Backend message: ${data.message}`);
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <p className="text-gray-400 text-lg">
          {data.message || "Blog not found."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Blogclient blog={data.blog} />
    </div>
  );
};

export default Blogserver;