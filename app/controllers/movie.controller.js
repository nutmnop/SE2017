var Movie = require('mongoose').model('Movie');


exports.list = function(req,res) {
	res.render('movie-list');
  }
  exports.item = function(req,res) {
   res.render('movie-item');
 }
