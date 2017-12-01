var Movie = require('mongoose').model('Movie');
var ObjectId = require('mongodb').ObjectID;
var multer = require('multer');
var Branch = require('mongoose').model('Branch');
var crypto = require('crypto');
var path = require('path');
var storage = multer.diskStorage({
  destination: 'public/img/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage }).array('myimage');
exports.list = function(req,res) {

  Movie.find({}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
      Branch.find({},function(err,bh){
  res.render('movie-list', {
    username: req.user ? req.user.username : '', movies,bh
  });
  })
}
});
}
exports.item = function(req,res) {
    var movies;
    Movie.find({}, function (err, movies_list) {
      if (err) {
        return next(err);
      } else {
        for(var i =0;i<movies_list.length;i++){
          console.log("list\n"+movies_list[i].id);
          if(movies_list[i].id === req.params.id){
           movies = movies_list[i];
           console.log(movies);
          }
        }
        Branch.find({},function(err,bh){
        res.render('movie-item', {
          username: req.user ? req.user.username : '',movies,movies_list,bh
        });
      })
    }
    });
 }
exports.renderaddmovie = function (req, res) {
  var movies = [];
  res.render('admin-editmovie', {
    username: req.user ? req.user.username : '',
    messages: req.flash('error'),movies
  });
}
exports.addmovie = function (req, res, next) {
  upload(req, res, function (err) {
    console.log(JSON.stringify(req.files[0].filename).replace(/"/gi, ""));
    console.log(req.body);
    var movie = new Movie(req.body);
    movie.poster = JSON.stringify(req.files[0].filename.replace(/"/gi, ""));
    movie.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    });
  });
}
exports.adminallmovie = function(req,res) {
    Movie.find({}, function (err, movies) {
      if (err) {
        return next(err);
      } else {
    res.render('admin-allmovie', {
      username: req.user ? req.user.username : '', movies
    });
    }
  });
}
exports.admineditmovie = function(req,res) {
  console.log("param movie id"+req.params.movieid);
  Movie.findOne({"_id":ObjectId(req.params.movieid)}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
  res.render('admin-editmovie', {
    username: req.user ? req.user.username : '', movies
  });
  }
});
}
exports.updatemovie = function(req,res,next) {
  console.log(req.body);
  Movie.findOneAndUpdate({"_id":ObjectId(req.params.movieid)},req.body,function(err, movies){
    if (err) return next(err);
    return res.redirect('/admin-allmovie');
});
}
exports.deletemovie = function(req,res,next) {
  console.log(req.body);
  Movie.findOneAndRemove({"_id":ObjectId(req.params.movieid)},function(err, movies){
    if (err) return next(err);
    return res.redirect('/admin-allmovie');
});

}