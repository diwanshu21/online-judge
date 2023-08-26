const mongoose = require("mongoose");
var dotenv =require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const bcrypt= require("bcrypt");

 
mongoose
  .connect(
    process.env.MONGO_URL
  )
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  });

const userSchema = mongoose.Schema({
  username: {
    type:String,
    required:[true,'Username required'],
    minlength:[3,"username length less than 3"]
  },
  password: {
    type:String,
    required:[true,'Password required'],
    minlength:[3,"password length less than 3"]
  },
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

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("User", userSchema);
const codesubmissionModel = mongoose.model("codesubmission", codesubmission);
const problemModel = mongoose.model("problem", problem);
module.exports = {UserModel,problemModel,codesubmissionModel};
