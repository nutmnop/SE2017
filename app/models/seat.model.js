var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeatSchema = new Schema({
    seatname:{unique:true,index:true,type:String,required:'seatname is required',trim:true},
    showtime:String,
    theatrenumber:Number,
    moviename:String,
    cost:{type:Number ,default:140},
    branchname: {type:String,required:'Theatrename is required',trim:true},
    available:{type:Boolean,default:true},
    row:{type:Number,min:1,max:18},
    seatnum:{type:Number,min:1,max:18},
    date:Number
    
  } 
);

//SeatSchema.set({createdAt: 1},{expireAfterSeconds: 3600});
 
 mongoose.model('Seat',SeatSchema);