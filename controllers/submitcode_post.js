const { problemModel, codesubmissionModel } = require("../config/database");
const { authenticate } = require("../config/utilities");

function submitecode_post(req, res) {
  authenticate(req, res)
    .then((result) => {
      console.log(result);
      if (result.user) {
        problemModel
          .findOne({ _id: req.params.id })
          .then((problem) => {
            if (problem.userid == result.user._id) {
              let data = {
                problemid: req.params.id,
                code: req.body.code,
                input: req.body.input,
                output: req.body.output,
              };
              console.log({ data });

              let codesubmit = new codesubmissionModel({ data });
              codesubmit
                .save()
                .then((finalsubmit) => {
                  console.log(finalsubmit);
                  res.status(200).json({success:true,message:'Code Submitted'})
                  console.log("code submitted");
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).json({success:false,message:'error in saving codesubmission'})
                  console.error("error in saving codesubmission");
                });
            } else {
              console.error("Access to the problem not allowed");
              res.status(500).json({success:false,message:'Access to the problem not allowed'})
            }
          })
          .catch((err) => {
            console.error({ err });
            console.error("Error in submit code DATABASE");
          });
        // res.status(200).render("index.ejs", { username: user.username });
      } else {
        res.status(500).json({ username: null,message:'user not found' });
      }
      console.log("data found");
    })
    .catch((err) => {
      console.log(err);
      console.log("errror found");
      res.status(500).json({ username: null,messsage:'error in submitcode' });
    });
}

module.exports = { submitecode_post };
