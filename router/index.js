const express = require('express');
const router = express.Router();


var models = require('../models');
const generateAlphaNumeric = require('../helpers/generateAlphaNumeric')
const crypto = require("crypto");


function checkPass(pass,secret) {
  //console.log(models.role);
  var hash = crypto.createHmac('sha256', `${secret}`)
                     .update(`${pass}`)
                     .digest('hex');
  return hash;
}
//
// function uniqueSecret(num,callback) {
//   let alphaNumeric = generateAlphaNumeric(num)
//   let query = {
//     where:{
//       secret:alphaNumeric
//     }
//   }
//   models.User.findOne(query)
//   .then((row)=>{
//     if(row === null){
//       callback(alphaNumeric)
//       unique = 1
//     } else {
//       uniqueSecret(num,callback)
//     }
//   })
// }

router.get(`/`,(req,res)=>{
  res.render(`index`,{welcome:`Selamat datang!!`, session: req.session,error: req.query.error})
})

router.get(`/login`,(req,res,next)=>{
  if(req.session.hasOwnProperty('username')) {
    res.redirect('/')
  } else {
    next()
  }
},(req,res)=>{
  res.render(`login`,{error: err=null})
})

router.post(`/login`,(req,res)=>{
  let login = {
    where:{
      username:req.body.username
    }
  }
  models.User.findOne(login)
  .then((row)=>{
    if (row !== null) {
      let pass = checkPass(req.body.password,row.secret)
      if (row.password === pass) {
        //console.log(row.username);
        req.session.username = row.username;
        req.session.role = row.role;
        req.session.hasLogin = true;
        res.redirect(`/`)
      } else {
        res.render(`login`,{error: 'Password salah'})
      }
    } else {
      res.render(`login`,{error: 'Akun atau password tidak ditemukan'})
    }
  })
  .catch((err)=>{
    res.render(`login`,{error: err})
  })
})

router.get(`/logout`, (req,res,next) => {
  req.session.destroy()
  next();
}, (req,res)=>{
  res.redirect(`/`);
})

router.get('/createUser',(req,res,next)=>{
  if(req.session.hasOwnProperty('username')) {
    res.redirect('/')
  } else {
    next()
  }
}, (req,res)=>{
  res.render('create-user',{error:req.query.error})
})

router.post('/createUser',(req,res)=>{
  function uniqueSecret(num) {
    let secret = generateAlphaNumeric(num)
    var add = {
      username: `${req.body.username}`,
      password: `${req.body.password}`,
      role: `${req.body.role}`,
      secret: `${secret}`
    }
    models.User.create(add)
    .then(()=>{
      res.redirect(`/createUser?error=User berhasil dibuat`)
    })
    .catch((err)=>{

      err.errors.forEach((x)=>{
        var temp = x.message.toLowerCase()
        var index = temp.indexOf("secret")
        if (index >= 0 ) {
          uniqueSecret(num)
        }
      })
  
      res.redirect(`/createUser?error=`+err.message)
    })
  }

  uniqueSecret(8)
})

module.exports = router
