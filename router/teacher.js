const express = require('express');
const router = express.Router();

var models = require('../models');

router.get(`/`,(req,res)=>{
  models.teacher.findAll()
  .then(teachers=>{
    var tableHeader = (Object.keys(teachers[0].dataValues))
    res.render(`teacher`,{dTeachers: teachers, dTableHeader: tableHeader})
  })
  .catch(err=>{
    console.log(err);
    res.render(`teacher?err=`+err,{dTeachers: teachers, dTableHeader: tableHeader})
  })
})

router.post(`/`,(req,res)=>{
  var add = {
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`
  }

  models.teacher.create(add)
  .then(()=>{
    res.redirect(`/teachers`)
  })
  .catch(err=>{
    console.log(err);
    res.redirect(`/teachers?err=`+err)
  })
})


module.exports = router
