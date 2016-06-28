// github application 的 CLIENT_ID 和 CLIENT_SECRET，应该从环境变量中读取
require('dotenv').load();
CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
PERSON_TOKEN = process.env.PERSON_TOKEN;
// 固定的权限请求地址
OAUTH_URL = "https://github.com/login/oauth/authorize?scope=public_repo&client_id=" + CLIENT_ID;

if(CLIENT_ID == undefined){
  console.log("WARNING: CLIENT_ID is undefined!");
}
if(CLIENT_SECRET == undefined){
  console.log("WARNING: CLIENT_SECRET is undefined!");
}
if(PERSON_TOKEN == undefined){
  console.log("WARNING: PERSON_TOKEN is undefined!");
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session')
var routes = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
var fake = require('./routes/fake');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO 设计一个 favicon
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'winteriscoming',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// cors 处理
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  if(req.headers.origin){
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }else{
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// 路由
app.use('/', routes);
app.use('/users', users);
app.use('/comments', comments);
app.use('/fake', fake);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
