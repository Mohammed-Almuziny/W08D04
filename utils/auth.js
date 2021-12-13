const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");

const usersModel = require("./../db/models/users");

const SECRET = process.env.SECRETKEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      // console.log("profile:", profile);
      const name = profile.given_name.toLowerCase();
      const email = profile.email.toLowerCase();

      const user = await usersModel
        .findOne({
          $or: [{ name }, { email }],
        })
        .populate("role");

      if (user) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role.role,
          isDel: user.isDel,
        };

        const options = {
          expiresIn: "60m",
        };

        const token = jwt.sign(payload, SECRET, options);

        return done(null, { result: user, token });
      } else {
        const newUser = new usersModel({
          avatar: profile.picture,
          name: user.name,
          email: email,
          verified: true,
        });

        newUser.save().then(async (result) => {
          const user = await usersModel
            .findOne({ _id: result._id })
            .populate("role");

          const payload = {
            id: user._id,
            name: res.name,
            email: res.email,
            role: res.role.role,
            isDel: user.isDel,
          };

          const options = {
            expiresIn: "60m",
          };

          const token = jwt.sign(payload, SECRET, options);

          return done(null, { result: res, token });
        });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
