const { problemModel } = require("../config/database");
const { authenticate } = require("../config/utilities");

function submitcode_get(req, res, next) {
  /**
   * id: problem id
   */

  // res.render("submitcode");
  authenticate(req, res)
    .then((result) => {
      console.log(result);
      if (result.user) {
        problemModel.findOne({ _id: req.params.id }).then((problem) => {
          console.log(problem);
          if (problem.userid ==result.user._id) {
            res.render("submitcode");
          } else {
            console.error("Access to the problem not allowed");
            res.send("Access to the problem not allowed");
          }
        });
        // res.status(200).render("index.ejs", { username: user.username });
      } else {
        res.status(200).render("index.ejs", { username: null });
      }
    })
    .catch((err) => {
      console.error(err);
      res.render("error", { message: "Error in authentication" });
    });
}

module.exports = {
  submitcode_get,
};
