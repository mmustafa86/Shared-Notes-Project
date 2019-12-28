const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport')
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

// var passports= require("./auth/index")
// passports(passport)
var home = require("./routes/home")
// var signUp= require("./routes/sign-up")


app.get('/success', (req, res) => res.redirect("/profile"));
  app.get('/error', (req, res) => res.send("error"));
  
  const LocalStrategy = require('passport-local').Strategy
  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  passport.deserializeUser(function (id, cb) {
    models.users.findOne({ where: { id: id } }).then(function (user) {
      cb(null, user);
    });
  });
  
  // passport local authintcation 

  
  passport.use(new LocalStrategy(
    function (username, password, done) {
      models.users.findOne({
        where: {
          username: username        }
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



app.use('/',home);
app.use('/sign-up',home);
app.use('/login',home);


app.post("/sign-up", function (req, res) {
  
models.users.create({ 
  firstname: req.body.firstname,
   lastname: req.body.lastname,
   username: req.body.username,
   password: req.body.password,
   email:req.body.email
  })
    .then(function (user) {
      console.log(user);
      res.redirect("login")
    })
 
});

app.post('/login',
passport.authenticate('local', { failureRedirect: '/error' }),
function(req, res) {
  res.redirect('/success?username='+req.user.username);
});
 

  app.get('/profile',function(req,res){
   var finds= function(id){
    models.users.findAll({ where: { id: id } })
    .then(function (reuslt) {
      
      console.log(reuslt)
      
    });
    return finds;
  
   } 
  
   res.render("profile.ejs",{users:finds})
  });
  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
  });

app.listen(3030, function(){
    console.log('server listening on port 3000');
  })