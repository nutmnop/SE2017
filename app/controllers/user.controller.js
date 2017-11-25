var User = require('mongoose').model('User');
var Movie = require('mongoose').model('Movie');
var multer = require('multer');
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
var passport = require('passport');


var getErrorMessage = function (err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username has already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
}

exports.render = function (req, res) {
  res.render('user-profile', {
    username: req.user ? req.user.username : '',
    messages: req.flash('error')
  });
}
exports.renderregist = function (req, res) {
  if (!req.user) {
    res.render('register', {
      username: req.user ? req.user.username : '',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }

}
exports.adminrender = function (req, res) {
  res.render('admin-index', {
    username: req.user ? req.user.username : '',
    messages: req.flash('error')
  });

}
exports.register = function (req, res, next) {
  console.log(req.body);
  if (!req.user) {
    var user = new User(req.body);
    user.usertype = 'customer';
    user.provider = 'local';
    console.log(user.body);
    user.save(function (err) {
      if (err) {
        var message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/register');
      }
      req.login(user, function (err) {//passport ทำให้
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  };
}
exports.rendereditmovie = function (req, res) {
  res.render('admin-editmovie', {
    username: req.user ? req.user.username : '',
    messages: req.flash('error')
  });
}
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}
exports.showprofile = function (req, res) {
  res.render('user-profile', {
    username: req.user ? req.user.username : '',
    messages: req.flash('error')
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