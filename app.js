var mongoose = require('mongoose');
var Message = require('./models/message');
// mongoose.connect('mongodb://localhost/babelchat_test');

var app = require('express')();
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
      if (translation === undefined) {
        io.emit('add message', msg);
      } else {
        console.log('translated message: ' + translation.translatedText);
        io.emit('add message', translation.translatedText);
      }
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
