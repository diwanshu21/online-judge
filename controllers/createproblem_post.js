const { problemModel, UserModel } = require("../config/database");
const { authenticate } = require("../config/utilities");

function createproblem_post(req, res, next) {
  authenticate(req, res)
    .then((result) => {
      console.log({ result });
      if (result.user) {
        let data = req.body;
        console.log(data);
        data.userid = result.user._id;
        console.log(typeof data.userid);
        console.log({ data });
        let problem = new problemModel(data);

        problem
          .save()
          .then((question) => {
            console.log({ question });
            console.log("user saved");

            UserModel.findOneAndUpdate(
              { username: result.user.username },
              { $push: { problems: question._id } }
            ).then((userdata) => {
              /**
               * @todo update problem in usermodel
               */
              console.log(userdata)
              let data = { url: `/problem/${question._id}` };
              res.json(data);
            });
          })
          .catch((err) => {
            console.error(err);
            console.error("error in saving problem");
          });
        // res.status(200).render("index.ejs", { username: user.username });
        console.log("data found");
      } else {
        var fullUrl = req.protocol + "://" + req.get("host") + "/" + "login";
        console.log(fullUrl);
        res.status(200).json({
          url: fullUrl,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.render("error", { message: "Error in authentication" });
    });
}

module.exports = {
  createproblem_post,
};
