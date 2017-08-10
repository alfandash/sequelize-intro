'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('students', [{
      first_name: `ganang`,
      last_name: `hidayat`,
      email: `ganang@sekolah.co.id`,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: `ujang`,
      last_name: `saepul`,
      email: `ujang@sekolah.co.id`,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
