var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/sign-up',function(req,res){
    res.render('signup.ejs')
  })
  
 module.exports = router;
