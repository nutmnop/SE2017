var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cookieSession = require('cookie-session');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');


module.exports = function () {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(compression);
  }
  app.use(cookieSession({
    name: 'session',
    keys: ['secret_key1', 'secret_key2']
  }));
  app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(validator());



  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  require('../app/routes/index.routes')(app);
  require('../app/routes/user.routes')(app);
  require('../app/routes/movie.routes')(app);
  app.use(express.static('./public'));
  app.use('*/assets',express.static('./public/assets'));
  app.use('*/bootstrap',express.static('./public/bootstrap'));
  app.use('*/img',express.static('./public/img'));
  

  return app;
}
