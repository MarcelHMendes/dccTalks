var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var socket_events = require('./client_communication/socket_events')
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

/*events*/
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/ldapindex.html`))
    .use(express.static('public'));

app.set('views', `${__dirname}/views`);
app.set('view engine','jade');

http.listen(port, () => console.log(`listening on port: ${port}`));
socket_events.connection_log(io);

io.on("connection", socket => {
    socket_events.wait_login(io, socket);
    socket_events.receive_message(io,socket);
    socket_events.receive_image(io, socket);
});
