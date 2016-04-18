module.exports = function WebSender(config){

	var WebSocketServer = require('ws').Server;
	var wss = new WebSocketServer({ port: config.port });

	this.Broadcast = function(message){
		if (wss.clients.length === 0){
			console.log('No web socket clients are connected.');
			return;
		}
		wss.clients.forEach(function each(client) {
			client.send(message);
		});
	};

}