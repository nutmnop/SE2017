var Movie = require('mongoose').model('Movie');


exports.list = function(req,res) {
	res.render('movie-list',{
    username:req.user?req.user.username:''
  });
  }
  exports.item = function(req,res) {
   res.render('movie-item',{
    username:req.user?req.user.username:''
  });
 }
