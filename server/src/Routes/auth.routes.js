const express = require("express");
const { registerUser, loginUser, googleLogin,
    forgotPassword,verifyOTP,resetPassword,changePassword, logoutUser ,} = require("../Controllers/auth.controller.js");
const protect = require("../Middlewares/auth.middleware.js")
const passport = require("../config/passport");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleLogin
);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.put("/change-password", protect, changePassword)
router.post("/logout", protect, logoutUser)

module.exports = router;
