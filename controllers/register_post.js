const { hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../config/database");

function register_post(req, res) {
  const user = new UserModel({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
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

      res.status(200).send({success:true,message:"Successfully registered"});
    })
    .catch((err) => {
      res.status(500).render({
        success: false,
        message: "Something went wrong",
        error: err,
      });
      console.error(err);
    });
}

module.exports = {
  register_post,
};
