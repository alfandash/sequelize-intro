'use strict';
module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define('student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Format email harus benar"
        }
      },
      unique: {
        msg: "Email sudah ada yang menggunakan. gunakan email lain!"
      }
    }
  });

  student.associate = models => {
    student.hasMany(models.SubjectStudent,{
      foreignKey:"idStudents"
    })
  }
  return student;
};
