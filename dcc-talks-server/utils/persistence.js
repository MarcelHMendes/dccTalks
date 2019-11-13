let ultimas_mensagens = [];
module.exports.armazenaMensagem = mensagem => ultimas_mensagens.push(mensagem);
module.exports.getMessages = () => ultimas_mensagens;
module.exports.clearMessages = () => ultimas_mensagens = [];