import React from "react";
import StatusClient from "./StatusClient";

type BlogStatus = {
  totalBlogs: number;
  totalComments: number;
  draftBlogs: number;
};

const StatusServer = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/BlogDashboard`
  );

  const data = await res.json();

  console.log("The data from statusserver: ", data.stats);

  return (
    <div>
      <StatusClient status={data.stats} />
    </div>
  );
};

export default StatusServer;