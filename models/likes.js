'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    gabid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
    likes.associate = function(models){
      likes.belongsTo(models.user, {as: 'userlike', foreignKey:'userid'});
      likes.belongsTo(models.messages, {as: 'gablike', foreignKey:'gabid'});
    }
  return likes;
};
