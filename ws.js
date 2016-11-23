var app = require('express')();
var http = require('http').Server(app);
var WebSocketServer = require('ws').Server;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/ws.html');
});

var wss = new WebSocketServer({server: http});

wss.on('connection', function(socket) {
  console.log('user connected');

  socket.on('close', function() {
    console.log('user disconnected');
  });

  socket.on('message', function(msg){
    wss.clients.forEach(function(client) {
      client.send(msg);
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});