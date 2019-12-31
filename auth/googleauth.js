const express= require("express");
const app =express();
var router = express.Router();
const passport =require('passport')
app.use(passport.initialize());
const models= require('/Users/mohammedmustafa/Desktop/backend project/models');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID ="382234308177-5gnbp943g9h6847g5ejh4bcjcklv0uue.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET="Ske7uzCJFY0gD5TRlic4YtjG"



passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  models.users.findOne({ where: { id: id } }).then(function (user) {
    done(null, user);
  }); 
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(req,accessToken, refreshToken, profile, done) {
    models.google.findOrCreate({ 
      where: {
      googleId: profile.id 
    }})
      return done(null, profile);
    // });
  }
  ));



  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

  router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  router.get('/profile', function(req,res){
  
    res.render("profile.ejs")

})
module.exports = router;