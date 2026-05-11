"use client";

type ModeratedBy = {
  _id: string;
  fullName: string;
};

type Blog = {
  _id: string;
  title: string;
  moderatedBy: ModeratedBy | null;
};

type Props = {
  blogs: Blog[];
};

const BlogClient = ({ blogs }: Props) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h1>{blog.title}</h1>
          <p>
            {blog.moderatedBy
              ? blog.moderatedBy.fullName
              : "Not Moderated"}
          </p>
        </div>
      ))}
    </div>
    
  );
};

export default BlogClient;