var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    url = require('url'),
    port = process.env.PORT || 5000;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

http.listen(port, function() {
  console.log('listening on port ...' + port);
});


io.on('connection', function(socket) {
  socket.on('message', function(data) {
    io.emit('message', data);
  })
});

