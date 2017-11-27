var Branch = require('mongoose').model('Branch');
var Theatre = require('mongoose').model('Theatre');
exports.adminallbranch = function(req,res) {
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
exports.addbranch = function(req,res,next){
  var branch = new Branch(req.body);
  console.log(req.body);
  branch.save(function (err) {
    if (err) {
      next(err);
    } else {
      console.log(branch);
    }
  });
  
  for(var i = 1 ;i<=req.body.numtheatre;i++){
    var theatre = new Theatre();
    theatre.theatrename = req.body.branchname+":theatre:"+i;
    theatre.branchname = req.body.branchname;
    theatre.theatrenum = i;
    theatre.save(function (err) {
      if (err) {
        next(err);
      } else {
        console.log(theatre);
      }
    });
  }
  
}