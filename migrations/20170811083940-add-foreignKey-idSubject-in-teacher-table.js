'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.addColumn('teachers','id_subjects',{type: Sequelize.STRING});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('teachers','id_subjects');
  }
};
