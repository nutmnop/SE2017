module.exports = function(app){
  var movie = require('../controllers/movie.controller');
  app.get('/movie-list',movie.list);
  app.get('/movie-item',movie.item);
  
}