const express = require('express');
const router = express.Router();
const models = require("../models");
const home = require("./home");
const signup = require("./signup");
const login = require("./login");
const gabble = require("./gabble");


router.get("/", function(req, res){
  res.render("signup",{errors:signup_messages});
});

let signup_messages = [];
//post info from signup form to user model
router.post("/", function (req, res) {
  //add error validation so that user can't enter an empty field
  req.checkBody("username", "Please enter a username.").notEmpty();
  req.checkBody("password", "Please enter a password.").notEmpty();
  //add error validation so that the confirm password has to equal the password
  req.checkBody("confirmpassword","The passwords do not match.").notEmpty().equals(req.body.password);

  let errors = req.validationErrors();
   if (errors){
     errors.forEach(function(error){
       signup_messages.push(error.msg);
     });
     res.render("signup",{errors:signup_messages});
   }else{
     var gabbuser = models.user.build({
       username: req.body.username,
       password: req.body.password
     });
     gabbuser.save().then(function(newUser){
       req.body.username = req.session.username;
      res.redirect('/gabble');
     })
   }
});

module.exports = router;
