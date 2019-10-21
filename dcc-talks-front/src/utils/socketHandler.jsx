import ioClient from "socket.io-client";

export default class SocketHandler {
  constructor(server_address) {
    this.socket = ioClient(server_address);
    this.connect = this.connect.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.messagesUpdate = this.messagesUpdate.bind(this);
    this.messageHistory = this.messageHistory.bind(this);
  }
  
  connect(username, ack) {
    this.socket.emit("entrar", username, ack);
  }
  sendMessage(msg, ack) {
    this.socket.emit("chat_message_send", msg, ack);
  }
  messagesUpdate(func) {
    this.socket.on("chat_message_update", func);
  }
  messageHistory(func) {
    //this.socket.on("chat_message_history", func);
    this.socket.on("chat_message_history", function(msg){ //recebe historico msgs
        console.log("history msg: "+ msg);
        console.log("msg.msg: "+msg.msg);
    });	
  }
}
