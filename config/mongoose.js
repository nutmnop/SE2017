var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){

  mongoose.set('debug',config.debug);
  var db = mongoose.connect(config.mongoUri);

  require('../app/models/user.model');
  require('../app/models/movie.model');
  require('../app/models/branch.model');
  require('../app/models/theatre.model');
  require('../app/models/seat.model');
  require('../app/models/payment.model');
  return db;

}
