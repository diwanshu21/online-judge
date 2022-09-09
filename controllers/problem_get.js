const { problemModel } = require("../config/database");
const { authenticate } = require("../config/utilities");

function problem_get(req, res) {
  authenticate(req, res)
    .then((data) => {
      console.log(data);
      if (data.user) {
        problemModel
          .findOne({ _id: req.params.id })
          .then((problem) => {
            console.log(problem);
            if (!problem) {
              res.status(401).send({
                success: false,
                message: "problem not found",
              });
            }
            console.log({ problem });

            res.status(200).render("problem", { problem });
          })
          .catch((err) => {
            res
              .status(404)
              .send({ message: false, message: "Error in problem" });
            console.log(err);
          });
      } else {
        res.status(200).render("index.ejs", { username: null });
      }
      console.log("data found");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { problem_get };
