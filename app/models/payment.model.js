var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    username:String,
    price:Number,
    seat:String, 
    branchname:String,
    date:String,
    theatrenum:Number,
    moviename:{type:String,default:""},
    showtime:String,default:""
  },{timestamps:true}

);
 PaymentSchema.index({createdAt: 1});
 mongoose.model('Payment',PaymentSchema);
  