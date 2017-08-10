const express = require('express');
const router = express.Router();
const models = require("../models");
// const home = require("./home");
const signup = require("./signup");
const login = require("./login");
const gabble = require("./gabble");

router.get('/', function(req,res){
  if (req.session.user) {
   models.messages.findAll({
     include: [{
       model: models.user,
       as: 'user'
     }]
   }).then(function(message){
     let array = [];
     message.forEach(function(message){
      let object = {
        username: message.dataValues.user.dataValues.username,
        gab: message.dataValues.gab,
        id: message.dataValues.id
      }
      if(req.session.userid === message.dataValues.userid){
        object.delete = true;
      }
        array.push(object);
     })
     res.render('home', {array: array})
  });
 } else {
   res.redirect("/login");
  }
});

router.get("/listoflikes", function (req, res) {
  let gablikes = models.likes.create({
    gabid:req.body.likebutton,
    userid:req.session.userid
  }).then(function (){
    res.redirect('/likes/' + req.body.likebutton + '/messages');
  })
});

module.exports = router;
