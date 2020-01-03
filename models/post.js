'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    fullname: DataTypes.STRING,
    subject: DataTypes.STRING,
    blog: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    post.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'user_id'
    })
  };
  return post;
};