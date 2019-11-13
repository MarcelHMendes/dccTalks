const assert = require('chai').assert;
const utils = require('../utils/utils.js');
const persistence = require('../utils/persistence.js');

describe('#utils', function (){
    describe('#utils.js', function(){
        describe('getRandomColor()', function(){
            it('deve retornar um tipo string', function(){
                let cor = utils.getRandomColor();
                assert.typeOf(cor, 'string');
            })
            it("A string deve começar com '#'", function(){
                let cor = utils.getRandomColor();
                assert(cor[0] == '#')
            })
            it('Verifica tamanho da string retornada', function(){
                let cor = utils.getRandomColor();
                assert(cor.length == 7)
            })
        })
    })
})
describe('#persistence.js', function(){
    afterEach(function () {
        persistence.clearMessages();
    });
    describe('armazenaMensagem()', function(){
        afterEach(function () {
            persistence.clearMessages();
        });
        it('Adiciona uma mensagem', function(){
            let msg1 = {msg: "msg1", tipo: ''};
            persistence.armazenaMensagem(msg1);
            assert(persistence.getMessages().length >= 1);
        });

        it('Adiciona e recupera mensagem', function(){
            let msg1 = {msg: "msg1", tipo: ''};
            let msg2 = {msg: "msg2", tipo: ''};
            persistence.armazenaMensagem(msg1);
            messages_len = persistence.getMessages().length
            assert(persistence.getMessages()[messages_len-1] == msg1, "Não adicionou no lugar correto");
            assert(persistence.getMessages()[messages_len-1] != msg2, "Não está recuperando corretamente");
        });

        it('Adiciona e recupera 2 mensagens', function(){
            let msg1 = {msg: "msg1", tipo: ''};
            let msg2 = {msg: "msg2", tipo: ''};
            let len_1=persistence.getMessages().length;
            persistence.armazenaMensagem(msg1);
            persistence.armazenaMensagem(msg2);
            let len_2=persistence.getMessages().length;
            assert((len_2 - len_1) == 2, "Não adicionou duas mensagens");
            assert((persistence.getMessages()[len_2-2]) == msg1, "Erro ao reucperar a mensagem 1");
            assert((persistence.getMessages()[len_2-1]) == msg2, "Erro ao reucperar a mensagem 2");
        });
    });
    describe('clearMessages()', function(){
        it('Testa quantas mensagens tem depois de um clearMessages', function(){
            persistence.clearMessages();
            assert(persistence.getMessages().length == 0);
        });
        it('adiciona uma mensagem e depois da clear', function(){
            let msg1 = {msg: "msg1", tipo: ''};
            persistence.armazenaMensagem(msg1);
            persistence.clearMessages();
            assert(persistence.getMessages().length == 0);
        });
        it('adiciona duas mensagens e depois da clear', function(){
            let msg1 = {msg: "msg1", tipo: ''};
            let msg2 = {msg: "msg2", tipo: ''};
            persistence.armazenaMensagem(msg2);
            persistence.clearMessages();
            assert(persistence.getMessages().length == 0);
        });
    });
    
});