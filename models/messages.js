'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    gab: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
    messages.associate = function(models){
      messages.belongsTo(models.user,{as: 'user', foreignKey : 'userid'});
    }
  return messages;
};
