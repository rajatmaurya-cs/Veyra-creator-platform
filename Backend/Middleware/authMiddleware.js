import { redisClient } from "../Config/redis.js";

import { validateAccessToken } from "../Service/Authentication.js";

const authMiddleware = async (req, res, next) => {
  try {
    
    console.log("Entered in authMiddleware")

    console.log("1")
    
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;


      console.log("2")
      
    const token = req.cookies?.accessToken || bearerToken;

    console.log("The access_token is from authMiddleware: ",token)

    console.log("3")



    if (!token) {
      return res.status(401).json({ message: "No access token" });
    }

console.log("4")

    const isBlocked = await redisClient.get(`bl_${token}`);


    console.log("5")

    if (isBlocked) {

      return res.status(401).json({

        message: "Session expired. Please login again.",

      });
    }

    console.log("6")


    const decoded = validateAccessToken(token);

    console.log("7")
    
    req.user = decoded;

    console.log("authMiddleware ✅")

    next();
  } catch (error) {
    console.log("authMiddleware error:", error?.message || error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export default authMiddleware;
