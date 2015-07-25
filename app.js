process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    apassport = require('passport'),
    uPassport = require('./config/passport');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var db = mongoose();

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
var mongoStore = new MongoStore({
  db: db.connection.db
});

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: config.sessionSecret,
  store: mongoStore
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(apassport.initialize());
app.use(apassport.session());

require('./routes/index.server.routes.js')(app);
require('./routes/users.server.routes.js')(app);
require('./routes/room.server.routes.js')(app);
app.use(express.static('./public'));
require('./config/socketio')(server, io, mongoStore);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

var passport = uPassport();

server.listen(3001);
module.exports = app;

console.log('Server running at http://localhost:3001/');

//var routes = require('./routes/index');
//var users = require('./routes/users');



// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);



// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/


//module.exports = app;
