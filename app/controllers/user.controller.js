var User = require('mongoose').model('User');
var Movie = require('mongoose').model('Movie');
var ObjectId = require('mongodb').ObjectID;
var crypto = require('crypto');
var Branch = require('mongoose').model('Branch');
var Payment = require('mongoose').model('Payment');
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
exports.renderregist = function (req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
      if (!req.user) {
        res.render('register', {
          username: req.user ? req.user.username : '',
          messages: req.flash('error'),movies,pages:req.params.pages
        });
      } else {
        return res.redirect('/');
      }
    }
  });
  

}
exports.adminrender = function (req, res) {
  res.render('admin-index', {
    username: req.user ? req.user.username : '',
    messages: req.flash('error')
  });

}
exports.register = function (req, res, next) {
  console.log(req.body);
  console.log("param "+req.params);
  if (!req.user) {
    var user = new User(req.body);
    user.usertype = 'customer';
    user.provider = 'local';
    console.log(user.body);
    user.save(function (err) {
      if (err) {
        var message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/register/'+req.params.pages);
      }
      req.login(user, function (err) {//passport ทำให้
        if (err) return next(err);
        console.log(req.params.pages);
        if(req.params.pages==='index'){
          res.redirect('/');
        }else if(JSON.stringify(req.params.pages).length > 20){
          res.redirect('/movie-item/'+req.params.pages);
        }
        else res.redirect('/'+req.params.pages);
      });
    });
  } else {
    if(req.params.pages==='index'){
      res.redirect('/');
    }else if(JSON.stringify(req.params.pages).length > 20){
      res.redirect('/movie-item/'+req.params.pages);
    }
    else res.redirect('/'+req.params.pages);
  };
}

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}
exports.showprofile = function (req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
      Branch.find({},function(err,bh){
      res.render('user-profile', {
        username: req.user ? req.user.username : '',
        messages: req.flash('error'),movies,user:req.user,bh
      });
    })
  }
  });
  
}
exports.editprofile = function(req,res){
  User.findOneAndUpdate({"_id":ObjectId(req.user.id)},req.body,function(err, movies){
    if (err) return res.send(err);
    return res.redirect('/user-profile');
});
}
exports.userpayment = function(req,res){
  Movie.find({}, function (err, movies) {
    if (err) {
      return next(err);
    } else {
     Payment.find({username:req.user.username},function(err,payment){
       console.log(payment);
       Branch.find({},function(err,bh){
      res.render('user-payment', {
        username: req.user ? req.user.username : '',
        messages: req.flash('error'),movies,user:req.user,payment,bh
      })
     })
    })
    }
  });
  
}

