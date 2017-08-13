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
     //console.log(subjects[0].teachers[0].first_name);
     res.render('subject', {data: subjects  })
   })
   .catch(err => {
     throw err
   })
 })

 .catch(err => {
   res.send(err)
 })
})

router.get(`/enrolledStudents`,(req,res)=>{
  models.subject.findById(req.query.id)
  .then((subjectRow)=>{
    subjectRow.getStudents({
      order: [
        ['first_name','ASC']
      ]
    })
    .then((studentRows)=>{
      res.render(`subject-enrolledStudents`, {
        subject:subjectRow,
        students:studentRows
      })
    })
  })
})

router.get(`/giveScore`,(req,res)=>{
  models.student.findById(req.query.idUser)
  .then((rowStudent)=>{
    models.subject.findById(req.query.idSubject)
    .then((rowSubject)=>{
      res.render(`subject-score`,{
        student:rowStudent,
        subject:rowSubject
      })
    })
  })
})

router.post(`/giveScore`,(req,res)=>{
  let update = {
    score: req.body.score
  }

  models.SubjectStudent.update(update,{
    where: {
      idSubjects:req.query.idSubject,
      idStudents:req.query.idStudent
    }
  })
  .then(()=>{
    res.redirect(`/subject`)
  })
  .catch((err)=>{
    res.sendt(err)
  })
})


module.exports = router;
