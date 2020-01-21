'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn('users', 'g_id', Sequelize.TEXT)
        
      },
  
  down: function (queryInterface, _Sequelize) {
      return queryInterface.removeColumn('users', 'g_id')
        
      },
  };