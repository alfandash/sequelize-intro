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

      username: johndoe, password: foobar, role: teacher
username: pakdengklek, password: gogetgold, role: academic
username: charlesxavier, password: magnetowhy, role: headmaster

    */

    return queryInterface.bulkInsert('Users',[{
      username: 'johndoe',
      password: 'foobar',
      role: 'teacher',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'pakdengklek',
      password: 'gogetgold',
      role: 'headmaster',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'charlesxavier',
      password: 'magnetowhy',
      role: 'headmaster',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users',null,{});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
