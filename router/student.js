const express = require('express');
const router = express.Router();

var models = require('../models')

router.use((req,res,next)=>{
  if(!req.session.hasLogin){
    res.redirect('/')
  } else {
    if(req.session.role === 'academic' || req.session.role === 'headmaster'){
      next()
    } else {
      res.redirect('/?error=dont have access to this menu')
    }
  }
})

router.get(`/`,(req, res)=>{
  models.student.findAll({
    order: [
      ['first_name','ASC']
    ]
  })
  .then(students=>{
    var tableHeader = (Object.keys(students[0].dataValues))
    res.render(`student`,{
      dStudents: students,
      dTableHeader: tableHeader,
      error: req.query.error,
      session: req.session})
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
    res.render(`student-edit`,{dStudent:row,
    session: req.session})
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
      res.render(`student-addSubject`,{
        student:studentRow,
        subjects:subjectRows,
        session: req.session})
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
