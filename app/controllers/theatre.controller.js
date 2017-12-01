var ObjectId = require('mongodb').ObjectID;
var Theatre = require('mongoose').model('Theatre');
var Movie = require('mongoose').model('Movie');
var Seat = require('mongoose').model('Seat');
exports.rendereditshowtime = function (req, res, next) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
  var day = date.getDate(); day = (day < 10 ? "0" : "") + day;
  var dates = day + "-" + month + "-" + year;
  Movie.find({}, function (err, movies) {
    console.log(req.params.theatreid);
    Theatre.findOne({ "_id": ObjectId(req.params.theatreid) }, function (err, theatres) {
      res.render('admin-editshowtime', {
        username: req.user ? req.user.username : '',
        dates,
        movies,
        theatres
      });
    });
  });

}

exports.renderalltheatre = function (req, res, next) {
  Theatre.find({ branchname: req.params.branchname }, function (err, theatre) {
    if (err) {
      return next(err); res.end(theatre);
    } else {
      res.render('admin-alltheatre', {
        username: req.user ? req.user.username : '', theatre
      });
    }
  });


}
exports.editshowtime = function (req, res, next) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
  var day = date.getDate(); day = (day < 10 ? "0" : "") + day;
  var dates = day + "-" + month + "-" + year;
  var datenum = day*1000000 + month*10000 +year;
  console.log(req.body);
  console.log(typeof(datenum));
  console.log(datenum);;
  // var movielength;
  Movie.find({}, function (err, movies) {
    if (err) {
      next(err);
    }
    else {
      for (var i = 0; i < movies.length; i++) {
        if (movies[i].title_th == req.body.title_th) {
          movielength = movies[i].length;

        }
      }
      console.log(movielength);
      var movietime = parseFloat(Math.floor(movielength / 60) + "." + movielength % 60);
      var opentime = parseFloat(JSON.stringify(req.body.timeopen).replace(/:/gi, ".").replace(/"/gi, ""));
      var closetime = parseFloat(JSON.stringify(req.body.timeclose).replace(/:/gi, ".").replace(/"/gi, ""));
      var breaktime = parseFloat(JSON.stringify(req.body.timebreak).replace(/:/gi, ".").replace(/"/gi, ""));
      var showtime = [];
      for (time = opentime; time < closetime;) {
        console.log(time + "time%1 = " + time % 1)
        if (time % 1 >= 0.59) {
          time = (time + 1.0) - 0.60;
        }
        console.log(time + "%0.1 = " + time % 0.1)
        if (time % 0.1 < 0.05) {
          time = time + (0.05 - (time % 0.1));
        } else if (time % 0.1 > 0.05 && time % 0.1 < 0.09) {
          time = time + (1 - (time % 0.1));
        }
        console.log(time.toFixed(2));
        if (time+movietime < closetime) {
          showtime.push(time.toFixed(2));
        }

        time = time + breaktime + movietime;
      }
      console.log('showtime ' + showtime.length);
      Theatre.findOneAndUpdate({ "_id": ObjectId(req.params.theatreid) }, { moviename: JSON.stringify(req.body.title_th), shwowtime: showtime }, function (err, theatres) { });
      Theatre.findOne({ "_id": ObjectId(req.params.theatreid) }, function (err, theatres) {
        if (err) {
          next(err);
        } else {
          for (var i = 0; i < theatres.shwowtime.length; i++) {
            for (var j = 1; j <= 9; j++) {
              for (var k = 1; k <= 18; k++) {
                console.log(theatres.shwowtime[i]);
                var seat = new Seat();
                seat.seatname = theatres.theatrename + " showtime " + theatres.shwowtime[i] +" แถวที่ "+j+" ที่นั่งที่ "+k;
                seat.showtime = theatres.shwowtime[i];
                seat.theatrenumber = theatres.theatrenum;
                seat.moviename = JSON.stringify(req.body.title_th);
                if (j == 1 || j == 2) {
                  seat.cost = 200;
                }
                seat.branchname = theatres.branchname;
                seat.row = j;
                seat.seatnum = k;
                seat.date = datenum;
                seat.save();
              }
            }
          }
          
        }
      });
      Theatre.findOne({ "_id": ObjectId(req.params.theatreid) }, function (err, theatres) {
        res.render('admin-editshowtime', {
          username: req.user ? req.user.username : '',
          dates,
          movies,
          theatres, data:req.body
        });
      });
    }
  });
}
exports.deleteshowtime=function(req,res,next){
 
      Theatre.findOneAndUpdate({ "_id":ObjectId(req.params.thid) },{moviename:"",shwowtime:[]}, function (err, theatres) {
       Theatre.find({branchname:theatres.branchname},function (err, theatre){
        res.render('admin-alltheatre', {
          username: req.user ? req.user.username : '', theatre
        });
       })
       
       
       
});
}
  
