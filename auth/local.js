const express= require("express");
const app =express();
const session = require('express-session');

// var cookieParser = require('cookie-parser');
var router = express.Router();
const passport =require('passport')
var pbkdf2 = require('pbkdf2');
var salt = "4213426A433E1F9C29368F36F44F1";

const models= require('/Users/mohammedmustafa/Desktop/backend project/models');


function encryptionPassword(password){
  var key =pbkdf2.pbkdf2Sync(
    password,salt, 36000,256, 'sha256'
  );
  var hash= key.toString('hex')
  return hash;
}



const LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize());
app.use(passport.session({secert: 'account'}));


passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    models.users.findOne({ where: { id: id } }).then(function (user) {
      done(null, user);
    }); 
  });


  passport.use(new LocalStrategy(
    function (username, password, done) {
      models.users.findOne({
        where: {
          username: username        }
      }).then(function (user) {
        if (!user) {
        
        }
  
        if (user.password != encryptionPassword(password)) {
          
          return done(null, false);
        }
        return done(null, user);
      }).catch(function (err) {
        return done(err);
      });
    }
  )); 

router.post('/login',
passport.authenticate('local', { failureRedirect: '/error' }),
function(req, res) {
  res.redirect('/success?username='+req.user.firstname)
  var  firstname =req.user.firstname
  var lastname= req.user.lastname
console.log(firstname+lastname);
  router.get('/profile', function(req,res){
  
    res.render("profile.ejs",{data :firstname ,data2: lastname})
  // }).error(function(err){
  //   console.log(err);
  // })
});
})



router.get('/success', function (req, res) {
  res.redirect("/profile");
} );
router.get('/error', function(req, res) {
  res.redirect("/login");
} )


router.post("/sign-up", function (req, res) {
    models.users.findOne({
    where: {
      username: req.body.username
    }}).then(function(user){
      console.log(user)
      if(!user){
        models.users.create({ 
          firstname: req.body.firstname,
           lastname: req.body.lastname,
           username: req.body.username,
           password: encryptionPassword(req.body.password),
           email: req.body.email
  
      }).error(function(err){
        console.log(err);
       
      });
      } else {
      res.render('signup', {error: 'The user is already created '})
      }
      res.redirect("login")
    })
    
    });


module.exports = router