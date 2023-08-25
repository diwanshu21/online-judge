const mongoose = require("mongoose");
var dotenv =require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
 
mongoose
  .connect(
    process.env.MONGO_URL
  )
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  problems: [String], 
});

const codesubmission = mongoose.Schema({
  problemid: String,
  code: String,
  input: String,
  output: String,
});
const problem = mongoose.Schema({
  title: String,
  timelimit: String,
  memorylimit: String,
  statement: String,
  userid:String,
  submissions: [String],
});

const UserModel = mongoose.model("User", userSchema);
const codesubmissionModel = mongoose.model("codesubmission", codesubmission);
const problemModel = mongoose.model("problem", problem);
module.exports = {UserModel,problemModel,codesubmissionModel};
