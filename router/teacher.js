const express = require('express');
const router = express.Router();

var models = require('../models');

router.get(`/`,(req,res)=>{
  models.teacher.findAll({
    order: [
      ['first_name','ASC']
    ]
  })
  .then(teachers=>{
    models.subject.findAll()
    .then((subjects)=>{
      var tableHeader = (Object.keys(teachers[0].dataValues))
      res.render(`teacher`,{dTeachers: teachers, dTableHeader: tableHeader, dSubjects: subjects})
    })
  })
  .catch(err=>{
    res.render(`teacher?err=`+err,{dTeachers: teachers, dTableHeader: tableHeader})
  })
})

router.post(`/`,(req,res)=>{
  var add = {
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    id_subjects: req.body.id_subjects
  }

  models.teacher.create(add)
  .then(()=>{
    res.redirect(`/teacher`)
  })
  .catch(err=>{
    console.log(err);
    res.redirect(`/teacher?err=`+err)
  })
})

router.get(`/delete`,(req,res)=>{
  models.teacher.destroy({
    where:{
      id: req.query.id
    }
  })
  .then(()=>{
    res.redirec(`/teachers`)
  })
  .catch((err)=>{
    res.redirect(`/teachers?err=`+err)
  })
})

router.get(`/edit`,(req,res)=>{
  models.teacher.findById(req.query.id)
  .then((row)=>{
    models.subject.findAll()
    .then((subjects)=>{
      res.render(`teacher-edit`,{dTeacher:row, dSubjects:subjects})
    })
  })
  .catch((err)=>{
    res.redirect(`/teachers?err=`+err)
  })
})


module.exports = router
