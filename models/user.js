'use strict';

// crypto
const crypto = require("crypto");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username tidak boleh kosong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password tidak boleh kosong"
        }
      }
    },
    role: DataTypes.STRING,
    secret: {
      type: DataTypes.STRING,
      unique: {
        msg: "Secret sudah digunakan"
      },
      validate: {
        notEmpty: {
          msg: "Secret tidak boleh kosong"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: function(User) {
        //console.log(models.role);
        var hash = crypto.createHmac('sha256', `${User.secret}`)
                           .update(User.password)
                           .digest('hex');
        User.password = hash;
      }
    }
  });
  return User;
};
