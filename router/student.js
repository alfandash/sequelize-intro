const express = require('express');
const router = express.Router();

var models = require('../models')

router.get(`/`,(req, res)=>{
  models.student.findAll()
  .then(students=>{
    var tableHeader = (Object.keys(students[0].dataValues))
    res.render(`student`,{dStudents: students, dTableHeader: tableHeader, error: req.query.error})
  })
})

router.post(`/`,(req,res)=>{
  var add = {
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`
  }

  models.student.create(add)
  .then(()=>{
    res.redirect(`/student`)
  })
  .catch((err)=>{
    console.log(err);
    res.redirect(`/student?error=`+err.message)
  })
})

router.get(`/delete`,(req,res)=>{
  //res.send(req.query.id)
  models.student.destroy({
    where: {
      id: `${req.query.id}`
    }
  })
  .then(()=>{
    res.redirect(`/student`)
  })
  .catch((err)=>{
    res.redirect(`/student?error=`+err)
  })
})

router.get(`/edit`,(req,res)=>{
  models.student.findById(req.query.id)
  .then(row=>{
    //res.send(row)
    res.render(`student-edit`,{dStudent:row})
  })
})

router.post(`/edit`,(req,res)=>{
  var update = {
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`
  }

  models.student.update(update,{
    where:{
      id: req.query.id
    }
  })
  .then(()=>{
    res.redirect(`/student`)
  })
  .catch((err)=>{
    res.redirect(`/student?error=`+err)
  })
})

router.get(`/addSubject`,(req,res)=>{
  models.student.findById(req.query.id)
  .then((studentRow)=>{
    models.subject.findAll()
    .then((subjectRows)=>{
      res.render(`student-addSubject`,{ student:studentRow, subjects:subjectRows})
    })
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post(`/addSubject`,(req,res)=>{
  var add = {
    idSubjects: req.body.idSubjects,
    idStudents: req.query.id
  }
  console.log(add);


  models.SubjectStudent.create(add)
  .then(()=>{
    res.redirect(`/student`);
  })
  .catch((err)=>{
    console.log(err);
    res.redirect(`/student?error=`+err.message)
  })
})



module.exports = router
