const express= require("express");
const app = express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
const http = require('http');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
app.set('view engine','ejs');
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
  secret: "cats", 
  resave: false, 
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

var home = require("./routes/home");
var passports = require('./auth/local');
var google= require('./auth/googleauth');

//routers
app.use(home);

app.use(google)
app.use(passports)


  models.sequelize.sync().then(function(){
    app.listen(3050, function(){
      console.log('server listening on port 3000');
  });
  })
