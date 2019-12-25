const express= require("express");
const app =express();
const bcrypt=require('bcrypt');
const models= require('./models');
const bodyParser= require("body-parser");
const passport = require('passport')
var Strategy = require('passport-local').Strategy;
const session = require("express-session");
app.set('view engine','ejs');
// var auth = require('./auth/index.js');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// app.use('/auth',auth);

app.get('/',function(req,res){
  res.render('main.ejs')
})






app.get('/login',function(req,res){
  res.render('login.ejs')
})

app.post("/login", function (req, res) {


})



app.get('/sign-up',function(req,res){
  res.render('signup.ejs')
})

app.post("/sign-up",async function (req, res) {
  
  try{
const hashePassword =await bcrypt.hash(req.body.password, 10)
models.users.create({ firstName: req.body.firstName, lastName: req.body.lastName,email: req.body.email,password: hashePassword})
    .then(function (user) {
    
    });
    res.redirect('/login')
  }catch{
    res.redirect('/sign-up')
  }
  
});




app.listen(3000, function(){
    console.log('server listening on port 3000');
  })