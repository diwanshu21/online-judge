const { compareSync } = require("bcrypt");
const { UserModel } = require("../config/database");
var jwt = require("jsonwebtoken");

function login_post(req, res, next) {
  UserModel.findOne({ username: req.body.username })
    .then((user) => {
      // No user
      if (!user) {
        res.cookie("jwt", "", {});
        return res.status(401).send({
          success: false,
          message: "Incorrect Username",
        });
      }

      console.log(req.body.password)

      // Incorrect password
      if (!compareSync(req.body.password, user.password)) {
        res.cookie("jwt", "", {});

        return res.status(401).send({
          sucess: false,
          message: "Incorrect Password",
        });
      }

      const payload = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });
      res.cookie("jwt", token, {});

      res.status(200).send({
        success: true,
        message: "Login successful",
      });
    })
    .catch((err) => {
      console.error(err);
      res.render("error", { message: "Error in login post" });
    });
}

module.exports = { login_post };
