const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, async (err, user) => {
        if (err) throw err;
        //NULL is the error, false is the user.
        if (!user) return done(null, false);
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      });
    })
  );
  //Stores a cookie in the browser
  passport.serializeUser((user, cb) => {
    return cb(null, user.id);
  });
  //Deserialize cookie
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      return cb(err, user);
    });
  });
};
