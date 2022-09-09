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
const { authenticate } = require("../config/utilities");

function homeRoute(req, res) {
  authenticate(req, res)
    .then((data) => {
      console.log(data);
      if (data.user) {
        res.status(200).render("index.ejs", { username: data.user.username });
      } else {
        res.status(200).render("home.ejs", { username: null });
      }
      console.log("data found");
    }).catch((err) => {
      console.log(err);
      console.log("errror found");
      res.render("error.ejs", {message:"Error in home route"});
    });
}

module.exports = {homeRoute};
