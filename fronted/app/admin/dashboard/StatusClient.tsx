
type Status = {
  totalBlogs: number;
  totalComments: number;
  draftBlogs: number;
};

type Props = {
  status: Status;
};


const StatusClient = ({status}:Props) => {
  return (
     <div>
      <h1>The Total Number of Blogs: {status.totalBlogs}</h1>
      <h2>The Total number of Comments: {status.totalComments}</h2>
      <h3>The total number of Darft: {status.draftBlogs}</h3>
    </div>
  )
}

export default StatusClient
