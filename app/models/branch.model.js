var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BranchSchema = new Schema({
    
    branchname: {type:String,unique:true,index:true,required:'branchrename is required',trim:true},
    branchlocation:String,
    numtheatre:Number
  });
  
  
  
  mongoose.model('Branch',BranchSchema);
  