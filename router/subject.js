const express = require('express');
const router = express.Router();

var models = require('../models');
var convertScore = require('../helpers/scoreLetter')


//login and role check

router.use((req,res,next)=>{
  if(!req.session.hasLogin){
    res.redirect('/')
  } else {
    if(req.session.role === 'teacher' || req.session.role === 'headmaster'){
      next()
    } else {
      res.redirect('/?error=dont have access to this menu')
    }
  }
})


function processConvertScore(studentRows, cb) {
  var num = 0;
  studentRows.forEach(x => {
    var letter = convertScore(x.SubjectStudent.score)
    x.scoreLetter = letter
    num++
    if (num === studentRows.length) {
      cb(studentRows)
    }
  })
}


router.get(`/`, (req, res) => {

  models.subject.findAll()
    .then(subjects => {
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
          res.render('subject', {
            data: subjects,
            session: req.session
          })
        })
        .catch(err => {
          throw err
        })
    })

    .catch(err => {
      res.send(err)
    })
})

router.get(`/enrolledStudents`, (req, res) => {
  models.subject.findById(req.query.id)
    .then((subjectRow) => {
      subjectRow.getStudents({
          order: [
            ['first_name', 'ASC']
          ]
        })
        .then((studentRows) => {
          processConvertScore(studentRows, (row) => {
            //console.log(row);

            res.render(`subject-enrolledStudents`, {
              subject: subjectRow,
              students: row,
              session: req.session
            })
          })

        })
    })
})

router.get(`/giveScore`, (req, res) => {
  // models.student.findById(req.query.idUser)
  //   .then((rowStudent) => {
  //     models.subject.findById(req.query.idSubject)
  //       .then((rowSubject) => {

  models.subject.findById(req.query.idSubject)
    .then((rowSubject) => {
      models.student.findById(req.query.idUser)
        .then((rowStudent) => {
          res.render(`subject-score`, {
            student: rowStudent,
            subject: rowSubject,
            session: req.session
          })
        })
    })
})

router.post(`/giveScore`, (req, res) => {
  let update = {
    score: req.body.score
  }

  models.SubjectStudent.update(update, {
      where: {
        idSubjects: req.query.idSubject,
        idStudents: req.query.idStudent
      }
    })
    .then(() => {
      res.redirect(`/subject/enrolledStudents?id=`+req.query.idSubject)
    })
    .catch((err) => {
      res.redirect(`/subject/enrolledStudents?error=`+err)
    })
})


module.exports = router;
