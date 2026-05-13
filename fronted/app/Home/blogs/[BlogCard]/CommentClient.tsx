import Moment from "moment";

type CreatedBy = {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
};

type Comment = {
  _id: string;
  content: string;
  blogId: string;
  createdBy: CreatedBy;
  createdAt: string;
};

type Props = {
  comments: Comment[];
};

const CommentClient = ({ comments }: Props) => {
  return (
    <section className="bg-zinc-950 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6">
        Comments ({comments.length})
      </h2>

      <div className="space-y-5">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm hover:border-zinc-700 hover:bg-zinc-900/80 transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={comment.createdBy.avatar}
                alt={comment.createdBy.fullName}
                className="w-11 h-11 rounded-full object-cover border border-zinc-700"
              />

              <div>
                <h3 className="font-semibold text-zinc-100">
                  {comment.createdBy.fullName}
                </h3>
                <p className="text-sm text-zinc-400">
                  {Moment(comment.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/* Comment Content */}
            <p className="text-zinc-300 leading-relaxed text-">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentClient;