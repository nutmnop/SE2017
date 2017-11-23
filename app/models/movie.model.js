var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var fs = require('fs');


var MovieSchema = new Schema({
  
  type:String,
  length:String,
  director:String,
  actor:String,
  rate:String,
  trailer:String,
  poster:String,
  synopsis :String,
  surname: String,
  title_th: {type:String,unique:true,required:'Title is required',trim:true},
  title_eng: {type: String,index : true},
  
  providerId:String,
  providerData:{} 
});



mongoose.model('Movie',MovieSchema);
