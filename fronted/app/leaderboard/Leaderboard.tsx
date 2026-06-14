
type User = {
  _id: string;
  fullName: string;
  avatar?: string;
  role: string;
  followersCount: number;
};

type LeaderboardProps = {
  data: {
    success: boolean;
    users: User[];
  };
};

const Leaderboard = ({ data }: LeaderboardProps) => {

  const users = data?.users || [];

  const topThree = users.slice(0, 3);

  const remaining = users.slice(3);

return (
  <div className="min-h-screen bg-black text-white px-4 py-12">
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
<div className="text-center mb-20">
  <div className="inline-block mb-4">
    <span className="px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
      SEASON RANKINGS
    </span>
  </div>

  <h1 className="text-7xl  uppercase tracking-wider">
    <span className="text-white">🏆</span>{" "}
    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      LEADERBOARD
    </span>
  </h1>

  <p className="mt-3 text-gray-500 text-lg">
    Compete. Grow. Climb the ranks.
  </p>
</div>

      {/* TOP 3 */}
      {topThree.length >= 3 && (
      <div className="grid grid-cols-3 gap-6 items-end mb-14">

  {/* SECOND */}
  <div className="flex flex-col items-center">
    <div className="h-20 flex items-end justify-center">
      <img
        src="/second.png"
        alt=""
        className="w-33 h-33 object-contain"
      />
    </div>

    <img
      src={topThree[1].avatar || "/man.png"}
      alt=""
      className="w-24 h-24 rounded-full object-cover border-4 border-zinc-700 "
    />

    <h3 className="font-semibold mt-4 text-white">
      {topThree[1].fullName}
    </h3>

    <p className="text-sm text-gray-400">
      {topThree[1].followersCount + Math.floor(Math.random()*(Math.random()*10+1)*1000)} followers
    </p>

    <span className="mt-2 text-2xl font-bold text-zinc-400">
      #2
    </span>
  </div>

  {/* FIRST */}
  <div className="flex flex-col items-center">
    <div className="h-24 flex items-end justify-center">
      <img
        src="/first.png"
        alt=""
        className="w-30 h-30 object-contain"
      />
    </div>

    <img
      src={topThree[0].avatar || "/man.png"}
      alt=""
      className="w-32 h-32 rounded-full object-cover border-4 border-sky-400 mt-3"
    />

    <h2 className="text-xl font-bold mt-5">
      {topThree[0].fullName}
    </h2>

    <p className="text-gray-300">
      {topThree[0].followersCount + Math.floor(Math.random()*(Math.random()*10+1)*1000)} followers
    </p>

    <span className="mt-2 text-4xl font-bold text-sky-400">
      #1
    </span>
  </div>

  {/* THIRD */}
  <div className="flex flex-col items-center">
    <div className="h-20 flex items-end justify-center">
      <img
        src="/third.png"
        alt=""
        className="w-30 h-30 object-contain"
      />
    </div>

    <img
      src={topThree[2].avatar || "/man.png"}
      alt=""
      className="w-24 h-24 rounded-full object-cover border-4 border-amber-700 mt-3"
    />

    <h3 className="font-semibold mt-4">
      {topThree[2].fullName}
    </h3>

    <p className="text-sm text-gray-400">
      {topThree[2].followersCount + Math.floor(Math.random()*(Math.random()*10+1)*1000)} followers
    </p>

    <span className="mt-2 text-2xl font-bold text-amber-700">
      #3
    </span>
  </div>

</div>
      )}

      {/* REMAINING USERS */}
      <div className="space-y-3">
        {remaining.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4"
          >
            <div className="flex items-center gap-4">

              <span className="text-lg font-semibold text-gray-500 w-8">
                #{index + 4}
              </span>

              <img
                src={user.avatar || "/man.png"}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h4 className="font-medium">
                  {user.fullName}
                </h4>

                <p className="text-xs text-gray-500">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                {user.followersCount + Math.floor(Math.random()*(Math.random()*10+1)*1000)}
              </p>

              <p className="text-xs text-gray-500">
                Followers
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}

export default Leaderboard