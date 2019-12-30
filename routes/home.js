var express = require('express');
var router = express.Router();
const models= require('/Users/mohammedmustafa/Desktop/backend project/models');
/* GET home page. */
router.get('/',function(req,res){
    res.render('main.ejs')
  })
  router.get('/sign-up',function(req,res){
    res.render('signup.ejs')
  })
  router.get('/login',function(req,res){
    res.render('login.ejs')
  })

  router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
  });
 
  router.get('/success', (req, res) => res.redirect("/profile"));
  router.get('/error', (req, res) => res.redirect("/login"));
  
 module.exports = router;
