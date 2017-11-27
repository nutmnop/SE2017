var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TheatreSchema = new Schema({
    theatrenumber:Number,
    branchname: {type:String,unique:true,index:true,required:'Theatrename is required',trim:true},
    availableseat:{type:Number,default:72},
    numtheatre:Number
  });
 
 mongoose.model('Theatre',TheatreSchema);
  