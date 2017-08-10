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
      validate: {

        isUnique: function(value, next) {
          student.find({where: {email: value}})
          .then(row => {
            return (row && row.id != this.id) ? next('Email telah digunakan!') : next()
          })
          .catch(err => {
            return next(err)
          })
        }
        
        // tes(value,next){
        //   // var id = this._modelOptions.whereCollection.id;
        //     student.find({where: {email: this.email}})
        //     .then((row)=>{
        //       console.log(row.id);
        //       console.log(id);
        //       if (row.email === this.email ) {
        //         return next("email sudah dipakai")
        //       }
        //       return next()
        //     })
        //     .catch((err)=>{
        //       return console.log(err);
        //     })
        //   }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return student;
};
