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

models.post.findAll().then(function(posts){
     console.log(posts);
     posts.forEach(element => {
       console.log(element.fullname + element.subject)
     });
     res.render('main.ejs',{names: posts})
   })

  
  })
  router.post("/delete", function (req, res, next) {
    var post =req.body.post_id
    console.log(post)
    models.post.destroy({where: { id: post}}).then((result) => {
    console.log(result)
    res.redirect('/')
    });
    
  });





router.put('/:id', function (req, res, next) {
  models.post.findByPk(req.params.id).then((article) => {
    return article.update(req.body);
  }).then((article) => {
    res.sed( article.id);
  });
});

  router.get('/delete',function(req,res){
    res.redirect('/')
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
