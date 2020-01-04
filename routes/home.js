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
/* GET home page. */


router.get('/',function(req,res){

models.post.findAll().then(function(user){
     console.log(user);
     user.forEach(element => {
       console.log(element.fullname + element.subject)
     });
     res.render('main.ejs',{names: user})
   })

  
  })


  router.get('/sign-up',function(req,res){
    res.render('signup.ejs')
  })
  router.get('/login',function(req,res){
    res.render('login.ejs')
  })
  router.get('/error',function(req,res){
    res.render('error.ejs',{error: 'password incorrect '})
  })




 
 module.exports = router;
