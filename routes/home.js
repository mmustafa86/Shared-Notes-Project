var express = require('express');
var router = express.Router();
const session = require('express-session');
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
  router.get('/error',function(req,res){
    res.render('error.ejs',{error: 'password incorrect '})
  })

  router.get("/logout", function(req, res){
    req.logout();
    // req.session.destroy();
    
    res.redirect("/");
    // res.end();
  });

  // router.get('/logout', function(req, res) {
  //   req.session.destroy(function(err){
  //      if(err){
  //         console.log(err);
  //      }else{
  //          console.log(session);
  //          req.end();
  //          res.redirect('/signup');
  //      }
  //   });
  
  // );}


 
 module.exports = router;
