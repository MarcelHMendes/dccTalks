var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

/*arrays*/
var ultimas_mensagens = []; //Armazena io histórico das mensagens trocadas
var usuarios = []; //Armazena os apelidos de usuários

/*events*/

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
})

.use(express.static('public'));

http.listen(3000, function(){
  console.log('listening on port:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on("connection", function(socket){


	socket.on("entrar", function(callback){
		for(indice in ultimas_mensagens){		//Envia histórico de msg para usuário que acabou de entrar no chat
			socket.emit("chat_message_update", ultimas_mensagens[indice]);
		}

	});

	socket.on("chat_message_send", function(message_sent, callback){
		message_sent = "[ " + pegarDataAtual() + " ]: " + message_sent;     

        io.sockets.emit("chat_message_update", message_sent);
        var obj_mensagem = {msg: message_sent, tipo: ''};
        
        armazenaMensagem(obj_mensagem);
        callback();
     });
});


/*functions*/

function pegarDataAtual(){
  var dataAtual = new Date();
  var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
  var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
  var ano = dataAtual.getFullYear();
  var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
  var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
  var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();
  
  var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
  return dataFormatada;
}

function armazenaMensagem(mensagem){
	ultimas_mensagens.push(mensagem);
}