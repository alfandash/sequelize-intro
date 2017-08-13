'use strict';
module.exports = function(sequelize, DataTypes) {
  var teacher = sequelize.define('teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    id_subjects: DataTypes.INTEGER
  });

  teacher.associate = models => {
    teacher.belongsTo(models.subject,{
            foreignKey:"id_subjects"
          })
  }

  return teacher;
};
