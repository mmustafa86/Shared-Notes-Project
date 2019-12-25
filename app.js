const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport')
app.set('view engine','ejs');

// const initializePassport =require ('./auth/index')





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome " + req.query.email + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  models.users.findOne({ where: { id: id } }).then(function (user) {
    cb(null, user);
  });
});

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (email, password, done) {
    models.users.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    }).catch(function (err) {
      return done(err);
    });
  }
));


app.get('/',function(req,res){
  res.render('main.ejs')
})



app.get('/sign-up',function(req,res){
  res.render('signup.ejs')
})

app.post("/sign-up", function (req, res) {
  
  
models.users.create({ firstName: req.body.firstName, lastName: req.body.lastName,email: req.body.email,password: req.body.password})
    .then(function (user) {
      res.redirect("login")
    })
 
});




app.get('/login',function(req,res){
  res.render('login.ejs')
})

app.post("/login",
passport.authenticate('local', { failureRedirect: '/error' }),
function(req, res) {
  res.redirect('/success?username='+req.user.email);
});
 

  app.get('/profile',function(req,res){
    res.render('profile.ejs')
  })



app.listen(3030, function(){
    console.log('server listening on port 3000');
  })