var ObjectId = require('mongodb').ObjectID;
var Theatre = require('mongoose').model('Theatre');
var Movie = require('mongoose').model('Movie');
var Seat = require('mongoose').model('Seat');
exports.render = function (req, res, next) {

    console.log('title'+req.body.moviename);
        Movie.findOne({title_th:req.body.moviename},function(err,movie){
            Theatre.find({moviename:JSON.stringify(req.body.moviename)},function(err,theatres){
                if(err) return next(error);
                else {
                   
                    console.log(theatres);
                    console.log('title'+movie.title_th);
                    res.render('step1',{
                        username: req.user ? req.user.username : '', theatres,movie
                    });
                }
            });
        });  
    
}
exports.renderselectseat = function(req,res,next){
    Seat.find({branchname:req.params.branchname,theatrenum:req.params.theatrenum,showtime:req.params.showtime}
    ,function(err,seats){
        res.render('payment2',{
            username: req.user ? req.user.username : '',seats
        });
    });
}
