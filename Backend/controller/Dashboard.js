import Blog from "../Models/Blog.js";
import Comment from "../Models/Comments.js";
import AILog from "../Models/AIlog.js";
import User from "../Models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { name, id } = req.user;
    const blogs = await Blog.find({ createdBy: id });
    const blogIds = blogs.map((blog) => blog._id);
    const comments = await Comment.find({
      blogId: { $in: blogIds },
    });
    const draftBlogs = await Blog.countDocuments({
      createdBy: id,
      isPublished: false,
    });
    const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
    const userFromDb = await User.findById(id);
    const totalFollowers = userFromDb?.followers?.length || 0;
    res.status(200).json({
      success: true,
      stats: {
        totalBlogs: blogs.length,
        totalComments: comments.length,
        draftBlogs,
        totalLikes,
        totalFollowers,
      },
    });

  } catch (err) {

    console.error("Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};





export const AidashboardStats = async (req, res) => {
  try {

    const delay = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));


    await delay(8000);

    console.log("Entered in aidashbaord stats in controller");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      AIrequests,
      AIrequestToday,
      mostUsedAIData,
      uniqueUsers,
    ] = await Promise.all([
      AILog.countDocuments(),
      AILog.countDocuments({
        createdAt: { $gte: today },
      }),
      AILog.aggregate([
        {
          $group: {
            _id: "$action",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]),
      AILog.distinct("userId"),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalRequests: AIrequests,
        todayRequests: AIrequestToday,
        mostUsedAI: mostUsedAIData[0]?._id || "No usage yet",
        uniqueUsers: uniqueUsers.length,
      },
    });

  } catch (err) {
    console.error("AI Dashboard Stats Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load AI dashboard stats",
    });
  }
};

export const AidashboardLogs = async (req, res) => {
  try {

    const delay = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));


    await delay(4000);

    console.log("Request goesout from aidashboardLogs")
    
    console.log("Entered in aidashbaord logs in controller");

    const logs = await AILog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "fullName role");

    res.status(200).json({
      success: true,
      logs,
    });

  } catch (err) {
    console.error("AI Dashboard Logs Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load AI dashboard logs",
    });
  }
};