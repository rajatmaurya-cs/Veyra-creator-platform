import React from "react";

import BlogClient from "./BlogClient"

type ModeratedBy = {
  _id: string;
  fullName: string;
};

type Blog = {
  _id: string;
  title: string;
  moderatedBy: ModeratedBy | null;
};

type BlogResponse = {
  blogs: Blog[];
};

const BlogServer = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/blogs?page=1&limit=5&category=All`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const blogData: BlogResponse = await res.json();

  console.log("The Data of Response is blogServer: ", blogData.blogs);

  return (
    <div>
      <BlogClient blogs={blogData.blogs} />
    </div>
  );
};

export default BlogServer;