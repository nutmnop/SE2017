var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TheatreSchema = new Schema({
    theatrename: {type:String,unique:true,index:true,required:'Theatrename is required',trim:true},
    branchname: String,
    availableseat:{type:Number,default:72},
    theatrenum:{type:Number,index:true},
    moviename:{type:String,default:""},
    shwowtime:[String],default:{}
  });
 
 mongoose.model('Theatre',TheatreSchema);
  