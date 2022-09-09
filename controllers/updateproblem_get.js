const { problemModel } = require("../config/database");
const { authenticate } = require("../config/utilities");


function updateproblem_get(req, res, next) {
  authenticate(req, res)
    .then((data) => {
      console.log(data);
      if (data.user) {
        problemModel
          .findOne({ _id: req.params.id })
          .then((problem) => {
            let data = {
              title: problem.title,
              memorylimit: problem.memorylimit,
              timelimit: problem.timelimit,
              statement: problem.statement,
            };
            problem = data;
            res.render("updateproblem", { problem });
          })
          .catch((err) => {
            console.error(err);
            console.log("Error in updating problem");
          });
        // res.status(200).render("index.ejs", { username: user.username });
      } else {
        res.status(200).render("index.ejs", { username: null });
      }
      console.log("data found");
    })
    .catch((err) => {
      console.log(err);
      console.log("errror found");
    });
}

module.exports = { updateproblem_get };
