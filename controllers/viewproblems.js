const { authenticate } = require("../config/utilities");
const { problemModel } = require("../config/database");
const axios = require("axios");

async function viewproblems(req, res) {
  authenticate(req, res)
    .then((result) => {
      if (result.user) {
        let data = result.user.problems;
        let arr = [];
        console.log(data.length);

        problemModel.find({ _id: { $in: data } }, function (err, docs) {
          console.log(docs)
          res.render("viewproblems", { docs });
        });
      } else {
        res.redirect('/login');
      }
    })
    .catch((Err) => {
      console.error(Err);
    });
}

module.exports = { viewproblems };
