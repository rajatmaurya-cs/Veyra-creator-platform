

'use client'

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Moment from "moment";
import { blogCategories } from "@/app/assets/assets";

const Page= () => {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState("all");

  const [togglingcomment , settogglingcomment] = useState("")

  const {
  data: allComments = [],
  isLoading,
  isError,
  error,
  isFetching,
} = useQuery({
  queryKey: ["comments"],

  queryFn: async () => {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/comments`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to load comments");
    }

    return data.comments || [];
  },

  staleTime: 20_000,
});

  const comments = useMemo(() => {
    if (filter === "approved") return allComments.filter((c) => c.isApproved);
    if (filter === "pending") return allComments.filter((c) => !c.isApproved);
    return allComments;
  }, [allComments, filter]);

  const toggleMutation = useMutation({

  mutationFn: async (commentId: string) => {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/toggle-comment`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ commentId }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || "Failed to update comment");
    }

    return data;
  },

  onMutate: () => {
    toast.loading("Updating comment...", {
      id: "toggle-comment",
    });
  },

  onSuccess: (data) => {

    toast.success(data?.message || "Updated!", {
      id: "toggle-comment",
    });

    queryClient.invalidateQueries({
      queryKey: ["comments"],
    });
  },

  onError: (err: Error) => {

    toast.error(
      err?.message || "Failed to update comment status",
      {
        id: "toggle-comment",
      }
    );
  },
});

const removeMutation = useMutation({

  mutationFn: async (commentId: string) => {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/removecomment`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ commentId }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || "Failed to remove comment");
    }

    return data;
  },

  onMutate: () => {

    toast.loading("Removing comment...", {
      id: "remove-comment",
    });
  },

  onSuccess: (data) => {

    toast.success(data?.message || "Removed!", {
      id: "remove-comment",
    });

    queryClient.invalidateQueries({
      queryKey: ["comments"],
    });
  },

  onError: (err: Error) => {

    toast.error(
      err?.message || "Failed to Delete",
      {
        id: "remove-comment",
      }
    );
  },
});

  const disableAll = toggleMutation.isPending || removeMutation.isPending;

  const handleRemove = async (commentId:string) => {
   

       settogglingcomment(commentId)
      removeMutation.mutate(commentId);
    
  };

  const handleTogglePublish = async (commentId:string, isApproved:boolean) => {
    

      settogglingcomment(commentId)
      toggleMutation.mutate(commentId);
    
  };

  return (
  <div className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 bg-[#0b0f19] text-gray-200 animate-in fade-in duration-500 flex flex-col h-full">
    
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl tracking-tight text-white font-semibold mb-2">
          Community Discussions
        </h1>

        <p className="text-gray-400 text-sm font-normal tracking-wide">
          Review and moderate user thoughts and feedback.
        </p>
      </div>

      <div className="inline-flex flex-wrap bg-[#111827] p-1.5 rounded-2xl border border-white/10 shadow-inner w-fit max-w-full">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
            filter === "all"
              ? "bg-[#1f2937] text-white border border-white/10 shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("approved")}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
            filter === "approved"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Approved
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
            filter === "pending"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Pending
        </button>
      </div>
    </div>

    <div className="space-y-4 mb-4">
      {isError && (
        <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-normal">
          ⚠️ {error?.message}
        </div>
      )}

      {!isLoading && !isError && isFetching && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm rounded-xl">
          <div className="w-3 h-3 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
          Refreshing discussions...
        </div>
      )}
    </div>

    <div className="w-full min-w-0 bg-[#111827] rounded-[2rem] border border-white/10 overflow-hidden relative flex-1 flex flex-col shadow-2xl">

      <div className="w-full min-w-0 flex-1 relative overflow-x-auto">
        <table className="min-w-[850px] w-full table-auto text-left border-collapse">
          
          <thead className="bg-[#0f172a] border-b border-white/10 sticky top-0 z-10">
            <tr className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
              <th className="px-4 lg:px-6 py-4 w-[6%] whitespace-nowrap">#</th>
              <th className="px-4 lg:px-6 py-4 w-[16%] whitespace-nowrap">Author</th>
              <th className="px-4 lg:px-6 py-4 w-[34%]">Message</th>
              <th className="px-4 lg:px-6 py-4 w-[18%] whitespace-nowrap">Posted</th>
              <th className="px-4 lg:px-6 py-4 w-[12%] whitespace-nowrap">Status</th>
              <th className="px-4 lg:px-6 py-4 w-[10%] text-center whitespace-nowrap">Moderate</th>
              <th className="px-4 lg:px-6 py-4 w-[8%] text-center whitespace-nowrap">Trash</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse align-middle">
                  
                  <td className="px-4 lg:px-6 py-5">
                    <div className="h-4 w-6 bg-white/10 rounded-md"></div>
                  </td>

                  <td className="px-4 lg:px-6 py-5">
                    <div className="h-4 w-24 bg-white/10 rounded-md"></div>
                  </td>

                  <td className="px-4 lg:px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-white/10 rounded-md"></div>
                      <div className="h-4 w-3/4 bg-white/10 rounded-md"></div>
                    </div>
                  </td>

                  <td className="px-4 lg:px-6 py-5">
                    <div className="h-4 w-20 bg-white/10 rounded-md"></div>
                  </td>

                  <td className="px-4 lg:px-6 py-5">
                    <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                  </td>

                  <td className="px-4 lg:px-6 py-5 text-center">
                    <div className="h-9 w-[110px] mx-auto bg-white/10 rounded-xl"></div>
                  </td>

                  <td className="px-4 lg:px-6 py-5 text-center">
                    <div className="h-10 w-10 mx-auto bg-white/10 rounded-xl"></div>
                  </td>
                </tr>
              ))
            ) : !isLoading && comments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-24 text-center">
                  
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-medium text-white mb-2">
                    No Discussions Found
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Try changing your filter settings to see more results.
                  </p>
                </td>
              </tr>
            ) : (
              comments.map((comment, index) => (
                <tr
                  key={comment._id}
                  className="group hover:bg-white/[0.03] transition-colors align-middle"
                >
                  
                  <td className="px-4 lg:px-6 py-5 text-sm text-gray-500 font-normal whitespace-nowrap">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>

                  <td className="px-4 lg:px-6 py-5 min-w-0">
                    <p
                      className="text-sm text-gray-100 break-words leading-6 font-medium"
                      title={comment.createdBy?.fullName}
                    >
                      {comment.createdBy?.fullName || "Anonymous"}
                    </p>
                  </td>

                  <td className="px-4 lg:px-6 py-5 min-w-0">
                    <p
                      className="text-sm text-gray-400 break-words leading-6 font-normal"
                      title={comment.content}
                    >
                      {comment.content}
                    </p>
                  </td>

                  <td className="px-4 lg:px-6 py-5 text-sm text-gray-500 whitespace-nowrap font-normal">
                    {Moment(comment.createdAt).fromNow()}
                  </td>

                  <td className="px-4 lg:px-6 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-wide font-medium ${
                        comment.isApproved
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          comment.isApproved
                            ? "bg-emerald-400"
                            : "bg-amber-400"
                        }`}
                      ></span>

                      {comment.isApproved ? "APPROVED" : "PENDING"}
                    </span>
                  </td>

                  <td className="px-4 lg:px-6 py-5 text-center whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleTogglePublish(comment._id, comment.isApproved)
                      }
                      disabled={disableAll}
                      className={`min-w-[110px] px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        comment.isApproved
                          ? "bg-[#1f2937] border border-white/10 text-gray-300 hover:bg-[#273449]"
                          : "bg-white text-black hover:bg-gray-200"
                      } disabled:opacity-50`}
                    >
                      {toggleMutation.isPending && togglingcomment === comment._id
                        ? "Wait..."
                        : comment.isApproved
                        ? "Hide"
                        : "Approve"}
                    </button>
                  </td>

                  <td className="px-4 lg:px-6 py-5 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleRemove(comment._id)}
                      disabled={disableAll}
                      className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                      title="Delete comment permanently"
                    >
                      {removeMutation.isPending && togglingcomment===comment._id ? (
                        "..."
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default Page;