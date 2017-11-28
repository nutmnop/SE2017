var Theatre = require('mongoose').model('Theatre');
var Movie = require('mongoose').model('Movie');
exports.rendereditshowtime = function (req, res, next) {
      var date = new Date();  
      var year = date.getFullYear();
      var month = date.getMonth() + 1;month = (month < 10 ? "0" : "") + month;
      var day  = date.getDate();day = (day < 10 ? "0" : "") + day;
      var dates = day + "-" +month+"-"+year;
      var movies = [];
      var theatres = [];
  Movie.find({}, function (err, movie) {
    if (err) {
      return next(err);
    } else {
       
       movies = movie;
      }
  });
  Theatre.find({},function(err,theatre){
    if(err){
      return next(err);
    }else{
      theatres = theatre;
    }
  });
  console.log(theatres);
  res.render('admin-editshowtime', {
    username: req.user ? req.user.username : '',
    dates,
    movies,
    theatres
  });
}

exports.renderalltheatre = function (req, res, next) {
  Theatre.find({branchname:req.params.branchname}, function (err, theatre) {
    if (err) {
      return next(err); res.end(theatre);
    } else {
      res.render('admin-alltheatre', {
        username: req.user ? req.user.username : '', theatre
      });
    }
  });


}
