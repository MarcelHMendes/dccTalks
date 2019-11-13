var persistence = require('../utils/persistence.js');
var utils = require('../utils/utils.js');
var ldapAuthenticate = require('../authentication/ldapauth.js').authenticate;
/*functions*/

var connection_log = function(io){
    io.on('connection', socket => console.log('a user connected'));
}

var wait_login = function (io_socket, socket){

    socket.on("entrar", (apelido, senha, callback) => {
            if(ldapAuthenticate(apelido, senha)) {
                socket.apelido = apelido;
                socket.color = utils.getRandomColor();
                let message_sent = `[ ${utils.pegarDataAtual()} ] ${apelido.fontcolor(socket.color)} ${'acabou de entrar na sala'.fontcolor(socket.color)}`;
                io_socket.sockets.emit("chat_message_update", message_sent);
                let ultimas_mensagens = persistence.getMessages();
                ultimas_mensagens.forEach(msg => socket.emit("chat_message_history", msg));
                console.log('login succeded');
                callback(true);
            } else {
                console.log('login failed');
                callback(false);
            }
    });
}

var receive_message = function (io_socket, socket){
    socket.on("chat_message_send", (message_sent, callback) => {
        console.log(message_sent);
        message_sent = `[ ${utils.pegarDataAtual()} ]: ${socket.apelido.fontcolor(socket.color)} ${'diz: '.fontcolor(socket.color)} ${message_sent}`;
        io_socket.sockets.emit("chat_message_update", message_sent); //Envia mensagens em tempo real
        let obj_mensagem = {msg: message_sent, tipo: ''};
        persistence.armazenaMensagem(obj_mensagem);
        callback();
    });
}

var receive_image = function(io_socket, socket){
    socket.on("image", data => {  //recebe img
        io_socket.sockets.emit('imageTo', data); //envia msg
    });
}

module.exports={
    wait_login: wait_login,
    connection_log: connection_log,
    receive_message: receive_message,
    receive_image: receive_image
}
