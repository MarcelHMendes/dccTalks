const assert = require('chai').assert;
const socket_events = require('../client_communication/socket_events.js');

express = require('express');
app = express();
http = require('http').Server(app);

var io_client = require('socket.io-client');

var os = require('os');

let port = process.env.PORT || 5000;
var end_point = 'http://' + os.hostname() + ':' + port;
var opts = {forceNew: true};


/*events*/
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/ldapindex.html`))
    .use(express.static('public'));

app.set('views', `${__dirname}/views`);
app.set('view engine','jade');


describe('#socket_events(server)', function (){
    this.timeout(1000);
    var io;
    beforeEach(function (done) {
        io = require('socket.io')(http);
        done();
    });
    afterEach(function (done){
        io.close();
        done();
    })
    it('Verifica se o servidor subiu', function (done){
        done();
    });
    describe('Verifica se o servidor consegue fechar e subir de novo', function (){
        it('1', function (done){
            done();
        });
        it('2', function (done){
            done();
        });
    });
    describe('Testes com clientes', function (){
        it('Verifica se consegue aceitar clientes', function (done){
            let client = io_client(end_point, opts);
            client.disconnect();
            done();
        });
    });
    
})