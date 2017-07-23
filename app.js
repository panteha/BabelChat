var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var Message = require('./models/message');

// mongoose.connect('mongodb://localhost/babelchat_test');

var app = require('express')();

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


var http = require('http').Server(app);
var io = require('socket.io')(http);
var translate = require('google-translate')(process.env.TRANSLATE_KEY);

// import environmental variables from our development.env file

require('dotenv').config();
const ENVIRONMENT = process.env.NODE_ENV.toUpperCase();

//Connect to our Database and handle an bad connections
mongoose.connect(process.env[`DATABASE_${ENVIRONMENT}`])
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // broadcast a chat message event to all sockets
    translate.translate(msg, 'fa', function(err, translation) {
      console.log('translated message: ' + translation.translatedText);
      io.emit('add message', translation.translatedText);
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
// listens
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
