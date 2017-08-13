const express = require('express');
const router = express.Router();

var models = require('../models');

router.get(`/`,(req,res)=>{

  models.subject.findAll()
  .then(subjects=>{

    let promises = subjects.map(subject => {
     return new Promise((resolve, reject) => {
       //console.log(subject);
       subject.getTeachers()
       .then(teachers => {
         //console.log(teachers);
         subject.teachers = teachers

        resolve(subject)
       })
       .catch(err => {
         reject(err)
       })
     })
   })

  Promise.all(promises)
   .then(subjects => {
     console.log(subjects[0].teachers[0].first_name);
     res.render('subject', {data: subjects  })
   })
   .catch(err => {
     throw err
   })
 })

 .catch(err => {
   res.send(err)
 })

    // console.log(subject);
    // var tableHeader = Object.keys(subject[0].dataValues)
    // res.render(`subject`,{dSubject:subject, dTableHeader:tableHeader})
})


module.exports = router;
