'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
    g_id: DataTypes.TEXT
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};