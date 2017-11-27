var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeatSchema = new Schema({
    theatrenumber:Number,
    branchname: {type:String,unique:true,index:true,required:'Theatrename is required',trim:true},
    available:{type:Boolean,default:true},
    row:{type:Number,min:1,max:9},
    seatnum:{type:Number,min:1,max:8},
    numtheatre:Number
  });
 
 mongoose.model('Seat',SeatSchema);