module.exports = function(app){
  var movie = require('../controllers/movie.controller');
  app.get('/movie-list',movie.list);
  app.get('/movie-item/:id',movie.item);
  app.get('/movie-item',movie.item);
  app.route('/admin-editmovie')
  .get(movie.renderaddmovie)
  .post(movie.addmovie);
  app.get('/admin-allmovie',movie.adminallmovie);
  app.route('/admin-editmovie/:movieid')
  .get(movie.admineditmovie)
  .post(movie.updatemovie);
  app.get('/deletemovie/:movieid',movie.deletemovie);
}