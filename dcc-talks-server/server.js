var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var port = process.env.PORT || 3000;



app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
})

.use(express.static('public'));


io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on port:3000');
});

//io.emit('some event', { for: 'everyone' });


io.on('connection', function(socket){
msg='Mensagem de teste';	
	//socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	//});
});