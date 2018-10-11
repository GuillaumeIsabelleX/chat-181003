var app = require('express')();
var http = require('http').Server(app);
var io = require('mentalos.socket.io')(http);
var port = 3011;
var countmessage = 0;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log(msg.from + ': ' + msg.message);
    });
  });


  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      countmessage++;
      io.emit('count message', countmessage);
      io.emit('chat message', msg);
    });



  });

http.listen(port, function(){
  console.log('listening on *:' + port);
});