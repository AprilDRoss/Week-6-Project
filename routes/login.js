const express = require('express');
const router = express.Router();
const models = require("../models");
const index = require("./index");
const home = require("./home");
const signup = require("./signup");
// const login = require("./login");
const gabble = require("./gabble");


router.get("/", function(req, res){
  res.render("login",{errors:messages});
});

let messages = [];
router.post("/", function(req, res){
  req.checkBody("username", "Please enter a username.").notEmpty();
  req.checkBody("password", "Please enter a password.").notEmpty();

  let errors = req.validationErrors();
   if (errors){
     errors.forEach(function(error){
       messages.push(error.msg);
     });
     res.render("login",{errors:messages});
   }else{
     models.user.findOne({
       where: {
         username: req.body.username,
       }
     }).then(function(user){
       if(!user){
         //let userNotFound = {message: "Didn't find you in the system. Please signup."}
         res.redirect("/login");
         //res.redirect("/login",{userNotFound:userNotFound})
       }else{
        if(user.password === req.body.password){
          req.session.user = user.username;
          req.session.userId = user.id;
          res.render('gabble', {username: req.session.username})
        }
       }
   });
}
});


module.exports = router;
