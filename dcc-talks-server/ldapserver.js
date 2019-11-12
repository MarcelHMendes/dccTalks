var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
let port = process.env.PORT || 5000;

const { Client } = require('ldapts');
const url = 'ldap://ldap.dcc.ufmg.br';
const client = new Client({
    url,
    tlsOptions: {
        requestCert: false
    },
});

/*functions*/
const ldapAuthenticate = async (username, password) => {
    const bindDN = `uid=${username},ou=People,dc=dcc,dc=ufmg,dc=br`
    try {
        await client.bind(bindDN, password)
        await client.unbind()
        return true
    } catch (ex) {
        return false
    }
}

const pegarDataAtual = () => {
    const currentDate = new Date()
    return `${currentDate.toLocaleDateString('pt-BR')} ${currentDate.toLocaleTimeString('pt-BR')}`
}

const armazenaMensagem = mensagem => ultimas_mensagens.push(mensagem);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

/*arrays*/
let ultimas_mensagens = []; //Armazena io histórico das mensagens trocadas

/*events*/
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/ldapindex.html`))
    .use(express.static('public'));

app.set('views', `${__dirname}/views`);
app.set('view engine','jade');

http.listen(port, () => console.log(`listening on port: ${port}`));
io.on('connection', socket => console.log('a user connected'));

io.on("connection", socket => {

    socket.on("entrar", (apelido, senha, callback) => {
        const login = isAuthenticated => {
            if(isAuthenticated) {
                socket.apelido = apelido;
                socket.color = getRandomColor();
                let message_sent = `[ ${pegarDataAtual()} ] ${apelido.fontcolor(socket.color)} ${'acabou de entrar na sala'.fontcolor(socket.color)}`;
                io.sockets.emit("chat_message_update", message_sent);
                ultimas_mensagens.forEach(msg => socket.emit("chat_message_history", msg));
                console.log('login succeded');
                callback(true);
            } else {
                console.log('login failed');
                callback(false);
            }
        }
        ldapAuthenticate(apelido, senha).then(login)
    });

    socket.on("chat_message_send", (message_sent, callback) => {
        message_sent = `[ ${pegarDataAtual()} ]: ${socket.apelido.fontcolor(socket.color)} ${'diz: '.fontcolor(socket.color)} ${message_sent}`;
        io.sockets.emit("chat_message_update", message_sent); //Envia mensagens em tempo real
        let obj_mensagem = {msg: message_sent, tipo: ''};
        armazenaMensagem(obj_mensagem);
        callback();
    });

    socket.on("image", data => {  //recebe img
        io.sockets.emit('imageTo', data); //envia msg
    });
});
