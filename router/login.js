const express = require('express');
const router = express.Router();

router.get(`/`,(req,res,next)=>{

},(req,res)=>{
  res.render(`login`,{error: err || ''})
})

module.exports = router
