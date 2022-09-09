var express = require("express");
var router = express.Router();
var { hashSync, compareSync } = require("bcrypt");
var jwt = require("jsonwebtoken");
var path = require("path");
var cp = require("child_process");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const {
  UserModel,
  problemModel,
  codesubmissionModel,
} = require("../config/database");

var { homeRoute } = require("../controllers/homeRoute");
const { login_post } = require("../controllers/login_post");
const { register_post } = require("../controllers/register_post");
const { problem_get } = require("../controllers/problem_get");
const { createproblem_post } = require("../controllers/createproblem_post");
const { updateproblem_get } = require("../controllers/updateproblem_get");
const { submitcode_get } = require("../controllers/submitcode_get");
const { submitecode_post } = require("../controllers/submitcode_post");
const { compile_post } = require("../controllers/compile_post");
const { logout_get } = require("../controllers/logout_get");
const { allproblems } = require("../controllers/allproblems");
const { problem_post } = require("../controllers/problem_post");
const { viewproblems } = require("../controllers/viewproblems");
 
function authenticate(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", (err, user) => {
      if (err)
        reject({ success: false, message: "Error in authentication", user });
      else if (!user)
        resolve({ success: true, message: "User not found", user });
      else if (user) resolve({ success: true, message: "User found", user });
    })(req, res);
  });
}

/**
 *  GET home page.
 */
router.get("/", homeRoute);

/**
 * GET Login page
 */
router.get("/login", function (req, res, next) {
  res.render("login");
});
/**
 * POST Login page
 */
router.post("/login", login_post);

/**
 * GET register page
 */
router.get("/register", (req, res) => {
  res.render("register");
});

/**
 * POST register page
 */
router.post("/register", register_post);

/**
 * GET Logout page
 */
router.get("/logout", logout_get);

router.get("/problem/:id", problem_get);
router.post("/problem/:id", problem_post);

router.get("/problems/:id", allproblems);

router.get('/viewproblems/',viewproblems)

/* GET Create problem page */
router.get("/createproblem", function (req, res, next) {
  res.render("createproblem");
});

/* POST Create problem  */
router.post("/createproblem", createproblem_post);

/* GET Update problem page */
router.get("/updateproblem/:id", updateproblem_get);

/* GET Code submission page */
router.get("/submitcode/:id", submitcode_get);

/**
 * POST submit code
 */
router.post("/submitcode/:id", submitecode_post);

/* GET Update code submission page */
router.get("/updatecode/", function (req, res, next) {
  res.render("updatecode");
});

/**
 * GET compile
 */
router.get("/compile", (req, res) => {
  res.render("compile");
});

/* POST compile */
router.post("/compile", compile_post);

module.exports = router;
