var express = require('express');
var router = express.Router();

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




router.get('/success', (req, res) => res.redirect("/profile"));
router.get('/error', (req, res) => res.send("error"));
 module.exports = router;
