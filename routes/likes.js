const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/:id/messages',function(req,res){
  models.likes.findAll({
    where:{
      gabsId: req.params.id
    },include: [{
        model: models.user,
        as: 'userLike'
      },
        {
        model: models.messages,
        as: 'gabLike'
      }]
  }).then(function(Like){
    let likeArray = [];
    Like.forEach(function(like){
     let likeObject = {
       username: like.userLike.username,
     }
       likeArray.push(likeObject);
    })
    res.render('likes', {array: likeArray})
  })
});


module.exports = router;
