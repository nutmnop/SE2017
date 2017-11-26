var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  surname: String,
  username: {type:String,unique:true,required:'Username is required',trim:true},
  email: {type: String,index : true,match:/.+\@.+\.+/},
  password: {type:String,required:'Password required'},
  usertype:{
    type:String,
    required:'Usertype is required'
  },
  dateofbirth:Date,
  phone:String,
  salt:String,
  provider:{
    type:String,
    required:'Provider is required'
  },
  providerId:String,
  providerData:{} 
});
UserSchema.pre('save',function(next){
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password,this.salt,10000,64,'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};

mongoose.model('User',UserSchema);
