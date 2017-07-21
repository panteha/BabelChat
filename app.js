var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var translate = require('google-translate')(process.env.TRANSLATE_KEY);

app.use(express.static('public'));

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
