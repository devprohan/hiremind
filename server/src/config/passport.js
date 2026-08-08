const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const fullName = profile.displayName;
        const profileImage = profile.photos?.[0]?.value || "";

        if (!email) {
          return done(new Error("Google account email not found"), null);
        }

        // Check Google ID first
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // Check if email already exists
        user = await User.findOne({ email });

        if (user) {
          // Connect Google account to existing account
          user.googleId = googleId;

          if (!user.profileImage && profileImage) {
            user.profileImage = profileImage;
          }

          await user.save();

          return done(null, user);
        }

        // Create new Google user
        user = await User.create({
          fullName,
          email,
          googleId,
          profileImage,
        });

        return done(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;