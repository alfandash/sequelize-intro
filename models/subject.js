'use strict';
module.exports = function(sequelize, DataTypes) {
  var subject = sequelize.define('subject', {
    subject_name: DataTypes.STRING
  });

  subject.associate = models => {
    subject.hasMany(models.teacher, {
      foreignKey: "id_subjects"
    })

    subject.belongsToMany(models.student, {
      through: models.SubjectStudent,
      foreignKey: 'idSubjects'
    })
  }

  return subject;
};
