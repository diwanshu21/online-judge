const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.rlfjf.mongodb.net/online_judge"
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
