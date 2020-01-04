const express= require("express");
const app =express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
const http = require('http')
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
app.set('view engine','ejs');
app.use(morgan('dev'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

// app.use(passport.session({key: 'username',secert: 'account' ,resave: false,
// saveUninitialized: false,cookie: {
//   expires: 600000
// }}));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

var home = require("./routes/home");
var passports = require('./auth/local');
var google= require('./auth/googleauth');

//routers
app.use(home);

app.use(google)
app.use(passports)

// app.post('/profile',function(req,res){
//   models.post.create({
// user_id: req.body.user_id,
// fullname: req.body.fullname,
// subject: req.body.subject,
// blog: req.body.blog

//   }).then(function(user){
//     console.log(user)
//   })
//   res.render('profile.ejs')
// })

app.get('/logout', function(req, res) {
  req.logout();
  // req.session.destroy()
  
  res.redirect('/');
});


  // models.sequelize.sync().then(function(){
    app.listen(3050, function(){
      console.log('server listening on port 3000');
  // });
  })
