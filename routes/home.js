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

// get all the notes in the main page 
router.get('/main',isLoggedIn,function(req,res){
var user_id= req.user.id
var name= req.user.firstname

console.log(user_id)
models.post.findAll().then(function(posts){
     console.log(posts);
     posts.forEach(element => {
       console.log(element.fullname + element.subject)
     });
     res.render('main.ejs',{names: posts ,user : user_id ,name: name })
   })

  
  })
  
router.get('/',function(req,res){
  res.render('mainpage.ejs')
})






  // delete the note 
  router.delete("/post/:id", function (req, res, next) {
    console.log("deleting");
    var post =req.params.id
    console.log(post)
    models.post.destroy({where: { id: post, user_id: req.user.id}}).then((result) => {
    console.log(result)
    res.json('deleted')
    });
    
  });
// update the note 
  router.get('/:id/edit',isLoggedIn,function (req, res, next){
    // console.log(req.params.id) 
  if(req.user.id!==undefined){
    models.post.findOne({where :{
      id: req.params.id,
      user_id: req.user.id
      
    }
  })
      .then((article) => {
      res.render('edit.ejs', { article: article });
    }).error(function(error){
      res.redirect('/')
    })

    }else {
      res.json('error')
    }
  
  });



  //update the note
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



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.status(400).json({
      'message': 'access denied'
  });
}
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
