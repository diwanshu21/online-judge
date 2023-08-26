const { hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../config/database");

function register_post(req, res) {
  console.log(req.body.username,req.body.password)
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });
 
  user
    .save() 
    .then((user) => {
      const payload = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });  

      res.status(200).json({success:true,message:"Successfully registered"});
    })
    .catch((err) => {
      let msg="";
      msg+=err.errors?.username?.message+"--";
      msg+=err.errors?.password?.message;

      res.status(500).json({
        success: false,
        message: msg,
        error: err,
      });
      // console.error(err.errors.username);
      console.error(Object.keys(err));
      console.log(err)
    });
}

module.exports = {
  register_post,
};
