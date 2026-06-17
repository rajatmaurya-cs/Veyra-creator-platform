
import { Suspense } from "react";
import Blogserver from "./Blogserver";
import Commentserver from "./CommentServer";
import BlogSkeleton from "./Loading";

type BlogCardProps = {
  params: Promise<{
    BlogCard: string; // ✅ Must match the git folder name [BlogCard] exactly (capital C)
    // macOS is case-insensitive so [Blogcard] worked locally, but Vercel (Linux)
    // is case-sensitive — git has [BlogCard] so params key is BlogCard not Blogcard
  }>;
};

const BlogCard = async ({ params }: BlogCardProps) => {

  const paramsData = await params;

  const id = paramsData.BlogCard; // ✅ Fixed: was paramsData.Blogcard (wrong case)
  
  console.log("Blog ID from params:", id);


  return (

    <div className="">  

      <Suspense fallback={<BlogSkeleton />}>
        <Blogserver Id={id} />
      </Suspense>

      <Suspense   fallback={<p>Loading comments...</p>}>
        <Commentserver Id={id} />
      </Suspense>
    </div>
  );
};

export default BlogCard;



