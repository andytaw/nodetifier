
(
function(){
	
	var sender = 'Andy Taw';
	
	var n = require('net');
	var r = require('readline');

	var send = function(msg, callback){
		var s = n.Socket();
		s.connect(23023,'127.0.0.1');
		s.write(sender + '|' + msg);
		s.end();
		if (typeof(callback) == 'function') callback();
	};
	
	var routeText = function(text){
		if (text === 'quit') {
			rl.close();
			process.exit(0);
			return;
		}
		if (text) {			
			send(text);
		}
		rl.prompt();
	};
	
	var rl = r.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  terminal: false
	});
	rl.setPrompt('NODETIFY> ');	
	rl.on('line', routeText);
	routeText();

}
)();