const passport =require('passport')
app.use(passport.initialize());
app.use(passport.session());

module.exports = function(){


  app.get('/success', (req, res) => res.redirect("profile"));
  app.get('/error', (req, res) => res.send("error"));
  
  const LocalStrategy = require('passport-local').Strategy
  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  passport.deserializeUser(function (id, cb) {
    models.users.findOne({ where: { id: id } }).then(function (user) {
      cb(null, user);
    });
  });
  
  // passport local authintcation 
  const LocalStrategy = require('passport-local').Strategy;
  
  passport.use(new LocalStrategy(
    function (username, password, done) {
      models.users.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (!user) {
          return done(null, false);
        }
  
        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      }).catch(function (err) {
        return done(err);
      });
    }
  )); 


}
