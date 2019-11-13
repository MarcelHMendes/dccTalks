const assert = require('chai').assert;
var expect = require('chai').expect;
const socket_events = require('../client_communication/socket_events.js');

var os = require('os');
var should = require("chai").should();
var socketio_client = require('socket.io-client');

let port = process.env.PORT || 5000;
var end_point = 'http://' + os.hostname() + ':' + port;
var opts = {forceNew: true};


describe('#socket_events(client)', function (){
    describe("async test socket.io", function () {
        this.timeout(1000);
        var socket;
        beforeEach(function (done) {
            socket = socketio_client(end_point, opts);  
            done();
        });
        afterEach(function (done) {
            socket.disconnect();
            done();
        });
        

        it('Verifica conexão com servidor', function (done){
            done();
        });
        it('Verificar entrar', function (done){
            socket.emit('entrar', 'apelido','senha', (entrou)=> {
                assert(entrou,true);
                done();
            });
        });
        describe('# usuário logado', function(){
            it('chat_message_send', function (done){
                let mensagem_de_teste="Mensagem de teste";
                var mensagem = "";
                socket.on('chat_message_update', function(msg){ //recebe msg tempo real
                    mensagem = msg;
                    assert.typeOf(msg, 'string')
                    done();
                });
                socket.emit('entrar','apelido','senha', (entrou)=> {
                    assert(entrou,true);
                });
                socket.emit("chat_message_send", "Mensagem de teste",() => {});
            });
            it
        });
    });
})