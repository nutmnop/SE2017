var Movie = require('mongoose').model('Movie');
var Branch = require('mongoose').model('Branch');
exports.render = function (req, res, next) {
  Movie.find({}, function (err, movies) {
    var movie ; var branch ;
    if (err) {
      return next(err);
    } else {
     Branch.find({},function(err,bh){
      res.render('index', {
        username: req.user ? req.user.username : '', movies,bh
      });
     })
     
    }
  });


}
