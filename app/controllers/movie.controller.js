var Movie = require('mongoose').model('Movie');
var ObjectId = require('mongodb').ObjectID;

exports.list = function(req,res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
      res.render('movie-list', {
        username: req.user ? req.user.username : '', movies
      });
    }
  });
  }
  exports.item = function(req,res) {
    Movie.findOne({"_id":ObjectId(req.params.id)}, function (err, movies) {
      if (err) {
        return next(err);
      } else {
        if(movies){
          console.log(movies);
          res.render('movie-item', {
            username: req.user ? req.user.username : '', movies
          });
        }else console.log('err');
        
      }
    });
 }
