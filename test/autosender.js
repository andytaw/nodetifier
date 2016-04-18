
(
function(){
	
	var sender = 'TAWBOT';
	var delay = 0;
	var delayI = 1000;
	
	var n = require('net');

	var send = function(msg){
		console.log('sending: \'' + msg + '\'');
		var s = n.Socket();
		s.connect(23023,'127.0.0.1');
		s.write(msg);
		s.end();
		console.log('sent...');
	}
	
	var sendDelay = function(msg){
		setTimeout(function(){
				send(sender + '|' + msg);
			},
			delay
		);
		delay += delayI;
	}

	var msgs = ['hello','world','warning','Odin died..'];
	
	msgs.forEach(sendDelay);

}
)();