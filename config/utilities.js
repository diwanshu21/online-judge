const passport = require("passport");

function authenticate(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", (err, user) => {
      if (err)
        reject({ success: false, message: "Error in authentication", user });
      else if (!user)
        resolve({ success: true, message: "User not found", user });
      else if (user) resolve({ success: true, message: "User found", user });
    })(req, res);
  });
}

module.exports = {authenticate};
