var user = require('../controllers/user.controller');
var User = require('mongoose').model('User');
var passport = require('passport');

module.exports = function (app) {
//register
  app.route('/register/:pages')
    .post(user.register)
    .get(user.renderregist);
  app.route('/register/movie-item/:pages')
  .post(user.register)
  .get(user.renderregist);
//login
  app.route('/login/:pages')
    .post(passport.authenticate('local',  {
      failureRedirect: '/register/index'
    }), (req, res) => {
      User.findOne({ username: req.body.username }, function (err, users) {
        if (users.usertype === 'customer') {
          console.log("param : "+req.params.pages);
          if(req.params.pages==='index'){
            res.redirect('/');
          }else if(JSON.stringify(req.params.pages).length > 20){
            res.redirect('/movie-item/'+req.params.pages);
          }
          else res.redirect('/'+req.params.pages);
         
        } else res.redirect('/admin-index');
      });
    });
//logout
  app.get('/logout', user.logout);
//showprofile
  app.route('/user-profile')
   .get(user.showprofile)
   .post(user.editprofile);
  
//admin
  app.get('/admin-index', user.adminrender);
//payment
    app.get('/user-payment',user.userpayment);
  
}