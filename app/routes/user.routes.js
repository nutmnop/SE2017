var user = require('../controllers/user.controller');
var User = require('mongoose').model('User');
var passport = require('passport');

module.exports = function (app) {

  app.route('/register')
    .post(user.register)
    .get(user.renderregist);
  app.route('/login')
    .post(passport.authenticate('local', {
      failureRedirect: '/register'
    }), (req, res) => {
      User.findOne({ username: req.body.username }, function (err, users) {
        if (users.usertype === 'customer') {
          res.redirect('/');
        } else res.redirect('/admin-index');
      });
    });
  app.get('/logout', user.logout);
  app.get('/admin-index', user.adminrender);//
  app.route('/admin-editmovie')
    .get(user.rendereditmovie)
    .post(user.addmovie);
  app.post('/admin-editmovie', user.addmovie);
  app.get('/user-profile', user.showprofile);
  app.post('/admin-editmovie2', function (req, res, next) {

  });
}