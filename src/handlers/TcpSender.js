module.exports = function TcpSender(config){
	
	var n = require('net');

	this.Send = function(message){
		var s = n.Socket();
		s.on('error',function(){ console.log('Could not send to TCP Receiver: ' + message); });
		s.connect(config.port, config.host);
		s.end(message);
	};

}