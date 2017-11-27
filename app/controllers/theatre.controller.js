var Theatre = require('mongoose').model('Theatre');
var Movie = require('mongoose').model('Movie');
exports.rendereditshowtime = function (req, res, next) {
  Movie.find({}, function (err, movies) {
    var movie ; var branch ;
    if (err) {
      return next(err);
    } else {
      res.render('admin-editshowtime', {
        username: req.user ? req.user.username : '', movies
      });
    }
  });


}
