var Branch = require('mongoose').model('Movie');
exports.adminallallbranch = function(req,res) {
    Branch.find({}, function (err, branch) {
      if (err) {
        return next(err);
      } else {
    res.render('admin-allbranch', {
      username: req.user ? req.user.username : '', branch
    });
    }
  });
}