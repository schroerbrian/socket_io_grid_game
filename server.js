var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    url = require('url');

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

http.listen(3000, function() {
  console.log('listening on port 3000...');
});


io.on('connection', function(socket) {
  socket.on('message', function(data) {
    io.emit('message', data);
  })
});

