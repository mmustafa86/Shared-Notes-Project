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
  router.delete("/post/:id", function (req, res, next) {
    console.log("deleting");
    var post =req.params.id
    console.log(post)
    models.post.destroy({where: { id: post, user_id: req.user.id}}).then((result) => {
    console.log(result)
    res.json('deleted')
    });
    
  });

  router.get('/:id/edit', function (req, res, next){
    console.log(req.params.id) 
    if (req.isAuthenticated()){
    models.post.findByPk(req.params.id).then((article) => {
      res.render('edit.ejs', { article: article });
    });
  } else {
    res.redirect('/');
  }
  });

router.post('/update',function(req,res){
console.log(req.body)

    models.post.update({

  fullname: req.body.fullname,
  subject: req.body.subject,
  blog: req.body.blog
    },{
where: { 
  id: req.body.id

}
  }).then(function(result){
res.redirect('/');
  })
})







// router.get('/edit',function(req,res){
//   if (req.isAuthenticated()){
//     res.render('edit.ejs')
//   } else {
//     res.redirect('/');
//   }
//   })



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
