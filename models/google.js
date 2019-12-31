'use strict';
module.exports = (sequelize, DataTypes) => {
  const google = sequelize.define('google', {
    googleId: DataTypes.INTEGER
  }, {});
  google.associate = function(models) {
    // associations can be defined here
  };
  return google;
};