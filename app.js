var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var Message = require('./models/message');
var User = require('./models/user');
var async = require('async');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var translate = require('./src/translate');
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
var sharedSession = session({ secret: 'ilovescotchscotchyscotchscotch' });
app.use(sharedSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

io.use(function(socket, next) {
  morgan('dev')(socket.client.request, socket.client.request.res, next);
});
io.use(function(socket, next){
  socket.client.request.originalUrl = socket.client.request.url;
  cookieParser()(socket.client.request, socket.client.request.res, next);
});
io.use(function(socket, next){
  socket.client.request.originalUrl = socket.client.request.url;
  sharedSession(socket.client.request,   socket.client.request.res, next);
});
io.use(function(socket, next){
  passport.initialize()(socket.client.request, socket.client.request.res, next);
});
io.use(function(socket, next){
  passport.session()(socket.client.request, socket.client.request.res, next);
});

require('./routes/routes.js')(app, passport);
require('dotenv').config();
const ENVIRONMENT = process.env.NODE_ENV.toUpperCase();

mongoose.connect(process.env[`DATABASE_${ENVIRONMENT}`])
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.get('/chat', function(req, res){
  if (req.user !== undefined) {
    console.log("request from " + req.user.local.email);
  }
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('get languages', function(){
    translate.getLanguages(function(err, languageCodes){
      socket.emit('list of languages', languageCodes);
    });
  })

  socket.on('chat message', function(msg){
    var username = "guest";
    if (socket.request.user !== undefined) {
      username = socket.request.user.local.email;
    }
    console.log('message: ' + msg);
    translate.translateMessage(msg, function(err, translations) {
      io.emit('add message', {user: username, msg: translations});
      var message = new Message({content : msg});
      message.save(function(err){
        if(err) throw err;
        console.log('User saved successfully!');
      });
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
