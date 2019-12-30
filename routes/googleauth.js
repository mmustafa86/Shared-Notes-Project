const express= require("express");
const app =express();
var router = express.Router();
const passport =require('passport')
app.use(passport.initialize());
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var GOOGLE_CLIENT_ID ="382234308177-5gnbp943g9h6847g5ejh4bcjcklv0uue.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET="Ske7uzCJFY0gD5TRlic4YtjG"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/google/callback"
  },
  function(req,accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    // });
  }
  ));


router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

module.exports = router;