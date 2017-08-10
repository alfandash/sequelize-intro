const express = require('express');
const router = express.Router();

var models = require('../models');

router.get(`/`,(req,res)=>{
  models.subject.findAll()
  .then(subject=>{
    var tableHeader = Object.keys(subject[0].dataValues)
    res.render(`subject`,{dSubject:subject, dTableHeader:tableHeader})
  })

})


module.exports = router;
