const { UserModel } = require("../config/database");
const { authenticate } = require("../config/utilities");

function allproblems(req, res) {
  authenticate(req, res)
    .then((result) => {
      if (result.user) {
        let ID = req.params.id;
        console.log("");
        if (result.user._id == ID) {
          let data = result.user.problems;
          let obj = Object.assign({}, data);
          // obj = JSON.parse(obj);
          console.log(obj);
          res.status(200).send(obj);
        }
      } else {
        res.status(200).json({ user: "NULL" });
      }
    })
    .catch((err) => {
      console.error(err);
      console.error("Error in authentication");
    });
}

module.exports = { allproblems };
