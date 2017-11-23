var user = require('../controllers/user.controller');

var passport = require('passport');
module.exports = function(app){
  
  app.route('/register')
  .post(user.register)
  .get(user.renderregist);
  app.route('/login')
    .post(passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/register',
    failureFlash: true
  }));
  app.get('/admin-index',user.adminrender);//
  app.route('/admin-editmovie')
  .get(user.rendereditmovie)
  .post(user.addmovie);
}