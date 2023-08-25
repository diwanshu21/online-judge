var passport = require("passport");
const {UserModel} = require("./database");
var dotenv =require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;

function cookieExtractor(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  console.log({token})
  return token;
}
console.log({opts});
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log({done,jwt_payload});
    // console.log(UserModel);
    console.log({jwt_payload},{opts})
    UserModel.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      // console.log({user})
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
