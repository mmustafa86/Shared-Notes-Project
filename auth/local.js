var express = require('express');
const app = express();
const session = require('express-session');
const passport =require('passport');
var router = express.Router();
const models= require('../models');

app.use(session({
  secret: "cats", 
  resave: false, 
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// var cookieParser = require('cookie-parser');
var pbkdf2 = require('pbkdf2');
var salt = "4213426A433E1F9C29368F36F44F1";


function encryptionPassword(password){
  var key =pbkdf2.pbkdf2Sync(
    password,salt, 36000,256, 'sha256'
  );
  var hash= key.toString('hex')
  return hash;
}



const LocalStrategy = require('passport-local').Strategy

  // Register User
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

//passport local strategy 


  passport.use(new LocalStrategy(
    function (username, password, done) {
      models.users.findOne({
        where: {
          username: username        }
      }).then(function (user) {
        if (!user) {
        return done(null,false)
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

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    models.users.findOne({ where: { id: id } }).then(function (user) {
      done(null, user);
    }); 
  });

// Using LocalStrategy with passport
router.post('/login',
passport.authenticate('local', { failureRedirect: '/error' }),
function(req, res) {
  res.redirect('/success?username='+req.user.firstname)

// console.log(firstname+lastname);
  // router.redirect('/profile')
})



router.post('/profile',function(req,res){
  models.post.create({
user_id: req.user.id,
fullname: req.body.fullname,
subject: req.body.subject,
blog: req.body.blog

  }).then(function(user){
    console.log(user)
  })
  res.redirect('profile')
})

router.get('/success', function (req, res) {
  console.log(req.user)
  if(req.isAuthenticated()){
    res.redirect("/profile");

  }else {
    res.send('not athorize')
  }
} );

router.get('/error', function(req, res) {
  res.redirect("/login");
} )


router.get('/profile',function(req,res){
  console.log(req.session);
  console.log(req.user);
  res.render("profile.ejs",{data :req.user ,data2: req.user })
// }).error(function(err){
//   console.log(err);
// })


});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router