var ObjectId = require('mongodb').ObjectID;
var Theatre = require('mongoose').model('Theatre');
var Movie = require('mongoose').model('Movie');
var Seat = require('mongoose').model('Seat');
var Payment = require('mongoose').model('Payment');
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
        console.log(seats[0].moviename);
        var a = seats[0].moviename.replace(/"/gi,"");
        Movie.findOne({title_th:a},function(err,movie){
            console.log(movie);
            var selectedseat= [];
            res.render('step2',{
                username: req.user ? req.user.username : '',seats,movie,selectedseat
            });
        })
    });
}
exports.renderstep3 = function(req,res,next){

console.log(req.params);
    Seat.find({branchname:req.params.branchname,theatrenumber:req.params.theaternum,showtime:req.params.showtime}
       ,function(err,seats){
            res.render('step3',{
                username: req.user ? req.user.username : '',seats
            });
        })
    
}
exports.renderstep4 = function(req,res,next){
        Seat.update({branchname:req.params.branchname,theatrenumber:req.params.theaternum,showtime:req.params.showtime, row:3 , seatnum:5}
            ,{available:false}
           ,function(err,seats){console.log(seats);});
        Seat.update({branchname:req.params.branchname,theatrenumber:req.params.theaternum,showtime:req.params.showtime, row:3 , seatnum:6}
            ,{available:false}
           ,function(err,seats){console.log(seats);});
           Seat.find({branchname:req.params.branchname,theatrenumber:req.params.theaternum,showtime:req.params.showtime}
            ,function(err,seats){
                Theatre.findOne({theatrenum:parseInt(req.params.theaternum),branchname:req.params.branchname},function(err,theatre){

                    console.log(theatre);
                    var a = theatre.moviename.replace(/"/gi,"");
                    var payment = new Payment();
                    payment.username = req.user.username;
                    payment.price = 400;
                    payment.seat="C5 C6";
                    payment.branchname = req.params.branchname;
                    payment.date = "1/12/2017";
                    payment.theatrenum = parseInt(req.params.theaternum);
                    payment.moviename=a;
                    payment.showtime=req.params.showtime;
                    payment.save();
                    Movie.findOne({title_th:a},function(err,movie){
                    res.render('step4',{
                        username: req.user ? req.user.username : '',seats,movie
                    });
                })        
            })  
             })
        
    }