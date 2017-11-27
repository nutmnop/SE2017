process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');
console.log('pre');
var db = mongoose();
console.log('mongoose');
var app = express();
var passport = passport();

app.listen(process.env.PORT || 8081);
console.log('server running');
