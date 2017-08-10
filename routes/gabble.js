const express = require('express');
const router = express.Router();
const models = require("../models");
const home = require("./home");
const signup = require("./signup");
const login = require("./login");
const gabble = require("./gabble");

router.get("/", function(req, res){
  if (req.session.user){
    res.render("gabble",{username:req.session.username});
  } else{
    res.redirect("/login");
  }

});
let gabble_errormessages =[];
// //post info from creategabble to message model
router.post("/", function (req, res) {

  req.checkBody("gabtext","Please enter a comment.").notEmpty();

  let errors = req.validationErrors();
   if (errors){
     errors.forEach(function(error){
       gabble_errormessages.push(error.msg);
     });
     res.render("gabble",{errors:gabble_errormessages});
   }else{
     let gabpost = models.messages.create({
       username:req.session.username,
       gab:req.session.gabtext,
       gabcreated: new Date()
     }).then(function(newPost){
       res.redirect('/home');
     })
   }
});

module.exports = router;
