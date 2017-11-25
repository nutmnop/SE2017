var Movie = require('mongoose').model('Movie');
exports.render = function (req, res, next) {
  Movie.find({}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
      res.render('index', {
        username: req.user ? req.user.username : '', movies
      });
    }
  });


}
