const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const session = require("express-session");
var auth = require('./auth/index.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/auth',auth);














app.listen(3000, function(){
    console.log('server listening on port 3000');
  })