//add express
const express = require('express');
const app = express();

//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ejs
app.set(`view engine`,`ejs`)

//add router
const indexRoute = require(`./router/index`);
const teachersRoute = require(`./router/teacher`);
const subjectRoute = require('./router/subject');
const studentRoute = require('./router/student');

app.use(`/`, indexRoute);
app.use(`/teacher`, teachersRoute);
app.use(`/subject`, subjectRoute);
app.use(`/student`, studentRoute)

app.listen(3000,()=>{
  console.log(`run in port 3000`);
})
