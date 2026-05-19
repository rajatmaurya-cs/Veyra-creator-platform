import { useInfiniteQuery } from "@tanstack/react-query";

export function usePublication({ category = "All", limit = 3, isAdmin = false, }) {


  return useInfiniteQuery({
    queryKey: ["blogs", category, limit, isAdmin],

    queryFn: async ({ pageParam = 1 }) => {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/blogs?page=${pageParam}&limit=${limit}&category=${category}`,
        {
          credentials: "include", // important for cookies
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();

      console.log("Infinite Blogs:", data);

      if (!data?.success) {
        throw new Error(
          data?.message || "Failed to fetch blogs"
        );
      }

      return data;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage?.hasMore
        ? lastPage?.nextPage
        : undefined,

    staleTime: 30_000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}