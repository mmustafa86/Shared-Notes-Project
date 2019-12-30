const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
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

var home = require("./routes/home");
var passports = require('./auth/local');
// var auth = require('./routes/googleauth')





var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID ="382234308177-5gnbp943g9h6847g5ejh4bcjcklv0uue.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET="Ske7uzCJFY0gD5TRlic4YtjG"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(req,accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
  ));


//router 
app.use('/',home);
app.use('/sign-up',home);
app.use('/login',home);
app.use('/success',passports);
app.use('/error',passports)
app.use('/logout',home)
app.use('/sign-up',home)
// app.use('/auth/google', auth);
app.use('/profile',passports);

app.use(passports)


app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


//user sign-up

  models.sequelize.sync().then(function(){
    app.listen(3030, function(){
      console.log('server listening on port 3000');
  });
  })
