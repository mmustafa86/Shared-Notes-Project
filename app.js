const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session({secert: 'account'}));
var home = require("./routes/home");
var passports = require('./auth/local');


//router 
app.use('/',home);
app.use('/sign-up',home);
app.use('/login',home);
app.use('/success',home);
app.use('/error',home)
app.use('/logout',home)
app.use('/sign-up',home)
app.use(passports);


//user sign-up

 

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

app.listen(3030, function(){
    console.log('server listening on port 3000');
});