
// import AIUsage from "../Models/AIUsage.js";
// import { redisClient } from "../Config/redis.js";
// import getConfigCached from "../utils/getConfigCached.js";

// const checkAiLimit = async (req, res, next) => {
//   try {

//     const config = await getConfigCached();

//     if (!config?.aiEnabled) {
//       return res
//         .status(403)
//         .json({ success: false, message: "AI is currently disabled" });
//     }

//     const userId = req.user?.id;

//     const role = req.user?.role;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

   

//     // --------  Per-minute per-user rate limit (Redis) --------
//     const perMinute = Number(config.aiPerMinuteLimit ?? 0);
//     if (!Number.isFinite(perMinute) || perMinute <= 0) {
//       return res
//         .status(500)
//         .json({ success: false, message: "aiPerMinuteLimit not configured" });
//     }

//     const rateKey = `AI:rate:${userId}`;
//     const rate = await redisClient.incr(rateKey);
//     if (rate === 1) await redisClient.expire(rateKey, 60);

//     if (rate > perMinute) {
//       return res.status(429).json({
//         success: false,
//         message: "Too many requests. Try again in a minute.",
//       });
//     }

//     // -------- App-wide daily limit (Redis) 

//     const dailyAppLimit = Number(config.dailyappLimit ?? 0);
//     if (!Number.isFinite(dailyAppLimit) || dailyAppLimit <= 0) {
//       return res
//         .status(500)
//         .json({ success: false, message: "dailyappLimit not configured" });
//     }

//     const now = new Date();
//     const dateKey = now.toISOString().slice(0, 10); // "YYYY-MM-DD" (UTC)

//     const appDailyKey = `AI:appDaily:${dateKey}`;
//     const appCount = await redisClient.incr(appDailyKey);

//     if (appCount === 1) {
  
//       const nextMidnightUTC = new Date();
//       nextMidnightUTC.setUTCHours(24, 0, 0, 0);

//       const ttlSeconds = Math.floor((nextMidnightUTC - now) / 1000);
//       await redisClient.expire(appDailyKey, ttlSeconds);
//     }

//     if (appCount > dailyAppLimit) {
//       return res.status(429).json({
//         success: false,
//         message: "Daily AI app limit reached. Try again tomorrow.",
//       });
//     }

    
//      if (role === "ADMIN") return next();

//     // --------  Per-user daily limit (Mongo, atomic & safe) 

//     const userLimit = Number(config.dailyAiLimit ?? 0);

//     if (!Number.isFinite(userLimit) || userLimit <= 0) {
//       return res
//         .status(500)
//         .json({ success: false, message: "dailyAiLimit not configured" });
//     }

//     let updated;

//     try {
   
//       updated = await AIUsage.findOneAndUpdate(
//         {
//           userId,
//           date: dateKey,
//           $or: [{ count: { $exists: false } }, { count: { $lt: userLimit } }],
//         },
//         {
//           $inc: { count: 1 },
//           $setOnInsert: { userId, date: dateKey, role },
//         },
//         { upsert: true, new: true }
//       );
      
//     } catch (err) {
//       if (err?.code === 11000) {
      
//         updated = await AIUsage.findOneAndUpdate(
//           { userId, date: dateKey, count: { $lt: userLimit } },
//           { $inc: { count: 1 } },
//           { new: true }
//         );
//       } else {
//         throw err;
//       }
//     }

//     if (!updated) {
//       return res.status(429).json({
//         success: false,
//         message: "Daily AI limit reached",
//       });
//     }

//     return next();

//   } catch (error) {
//     console.error("AI Limit Middleware Error:", error);

//     const status = error.status || error.statusCode || 500;
//     return res.status(status).json({
//       success: false,
//       message:
//         status >= 500
//           ? "AI limit check failed"
//           : error.message || "Request blocked",
//     });
//   }
// };

// export default checkAiLimit;

import User from "../Models/User.js";
import AIUsage from "../Models/AIUsage.js";
import { redisClient } from "../Config/redis.js";
import getConfigCached from "../utils/getConfigCached.js";

const checkAiGenerationLimit = async (req, res, next) => {
  try {
    const config = await getConfigCached();

    if (!config?.aiEnabled) {
      return res.status(403).json({
        success: false,
        message: "AI is currently disabled",
      });
    }

    const userId = req.user?.id;

    const role = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ---------------------------------
    // Per-minute rate limit
    // ---------------------------------

    const perMinute = Number(config.aiPerMinuteLimit);

    const rateKey = `AI:rate:${userId}`;

    const rate = await redisClient.incr(rateKey);

    if (rate === 1) {
      await redisClient.expire(rateKey, 60);
    }

    if (rate > perMinute) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Try again in a minute.",
      });
    }

    // ---------------------------------
    // Global daily limit
    // ---------------------------------

    const dailyAppLimit = Number(config.dailyappLimit);

    const now = new Date();

    const dateKey = now.toISOString().slice(0, 10);

    const appDailyKey = `AI:appDaily:${dateKey}`;

    const appCount = await redisClient.incr(appDailyKey);

    if (appCount === 1) {
      const nextMidnightUTC = new Date();
      nextMidnightUTC.setUTCHours(24, 0, 0, 0);

      const ttl = Math.floor(
        (nextMidnightUTC.getTime() - now.getTime()) / 1000
      );

      await redisClient.expire(appDailyKey, ttl);
    }

    if (appCount > dailyAppLimit) {
      return res.status(429).json({
        success: false,
        message: "Daily AI app limit reached.",
      });
    }

    // ---------------------------------
    // Admin bypass
    // ---------------------------------

    if (role === "ADMIN") {
      return next();
    }

    // ---------------------------------
    // User + Plan
    // ---------------------------------

    const user = await User.findById(userId)
      .populate("plan")
      .lean();

    if (!user || !user.plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const usage = await AIUsage.findOne({ user: userId });

    if (!usage) {
      return res.status(404).json({
        success: false,
        message: "Usage record not found",
      });
    }

    const planLimitforGeneratoin = user.plan.limits.aiGenerationUsed;
    

    if (usage.aiGenerationUsed >= planLimitforGeneratoin) {
      return res.status(429).json({
        success: false,
        message: "AI generation limit reached for your plan",
      });
    }

    const planLimitforSummarisation = user.plan.limits.aiSummarizerUsed;
    if (usage.aiSummarizerUsed >= planLimitforSummarisation) {

      return res.status(429).json({
        success: false,
        message: "AI Summarisation limit reached for your plan",
      });

    }

    next();
  } catch (error) {
    console.error("AI Limit Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI limit check failed",
    });
  }
};

export default checkAiGenerationLimit;