import express from "express";
import jwt from "jsonwebtoken";
import {

  /*====signup & Login =====*/
  login,
  signup,
  googleLogin,


  /*===== Logout & refreshAccessToken =====*/
  logout,
  refreshAccessToken,


  /*===== Logout OTP refreshAccessToken =====*/
  sendOtp,
  verifyOtp,


  /*===== Emails =====*/
  verifyEmails,


  /*===== Reset Password =====*/
  resetpassword,
  checkmailforreset

} from "../controller/auth.controller.js"

import checkAiLimit from "../Middleware/aiLimitMiddleware.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const authRouter = express.Router();




authRouter.get("/me", (req, res) => {
  try {

    console.log("The request enter in /me")

    const token = req?.cookies?.accessToken;
    
    console.log("The token from /me is: ",token)

    if (!token) {
      return res.status(401).json({
        loggedIn: false,
      });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  //   const user = {
  //    name : user.fullName,
  //    id: user._id,
  //    role: user.role,
  //    email : user.email,
  //    avatar : user.avatar,
  //  createdAt: user.createdAt,
  // };

  console.log(user)

    res.json({
      success:true,
      user,
    });

  } catch (err) {
    console.log(err)
    res.status(401).json({
      success:false,
    });
  }
});

/* --------------------------- Signup & Login --------------------------- */




authRouter.post("/signup", signup);

authRouter.post("/login", (req, res, next) => {
  console.log("Request goes from authroutes")
  next()
}, login);


authRouter.get("/google", (req, res, next) => {

  console.log("Request goes from /google 1 ")

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;

  console.log("Request goes from /google 2 ")

  res.redirect(url);

});

authRouter.get('/google/callback',(req,res,next)=>{
console.log("Request Goes from /google/callback ")
next();
} ,googleLogin)





/* --------------------------- Logout and Refresh Token --------------------------- */

authRouter.post("/logout", authMiddleware, logout);
authRouter.post("/refreshtoken", refreshAccessToken);





/* --------------------------- OTP --------------------------- */

authRouter.post("/sendotp", sendOtp);

authRouter.post("/verifyotp", (req,res,next)=>{
  console.log("Request goes from /VerifyOtp ✅")
  next()
},verifyOtp);




/* --------------------------- EMAIL --------------------------- */

authRouter.post("/verifyemail", verifyEmails);




/* --------------------------- PASSWORD RESET --------------------- */

authRouter.post("/checkemailforreset", checkmailforreset);
authRouter.post("/reset-password", resetpassword);

export default authRouter;
