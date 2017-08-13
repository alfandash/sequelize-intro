'use strict';
module.exports = function(sequelize, DataTypes) {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    idSubjects: DataTypes.INTEGER,
    idStudents: DataTypes.INTEGER
  });

  SubjectStudent.associate = models => {
    SubjectStudent.belongsTo(models.subject,{
      foreignKey:"idSubjects"
    })
  }

  SubjectStudent.associate = models => {
    SubjectStudent.belongsTo(models.student,{
      foreignKey:"idStudents"
    })
  }

  return SubjectStudent;
};
