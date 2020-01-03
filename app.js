const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
const http = require('http')
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
app.set('view engine','ejs');
app.use(morgan('dev'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());

app.use(passport.session({key: 'username',secert: 'account' ,resave: false,
saveUninitialized: false,cookie: {
  expires: 600000
}}));

app.use(session({secret: 'anything'}));

var home = require("./routes/home");
var passports = require('./auth/local');
var google= require('./auth/googleauth');

//routers
app.use(home);
// app.use('/sign-up',home);
// app.use('/login',home);
// app.use('/success',passports);
// app.use('/error',passports)
// app.use('/logout',home)
// app.use('/sign-up',home)
// app.use('/auth/google', google);
// app.use('/auth/google/callback',google);
// app.use('/profile',passports);
app.use(google)
app.use(passports)



  models.sequelize.sync().then(function(){
    app.listen(3040, function(){
      console.log('server listening on port 3000');
  });
  })
