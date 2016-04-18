
(function(){

	var env = 'dev';
	var pkg = require('./package.json');
	var config = require('./config.' + env + '.json');	
	var n = require('net');


	// SETUP HANDLERS
	var tcpSender = new (require('./handlers/TcpSender'))({port: config.tcpSender.targetPort, host: config.tcpSender.targetHost});
	var wsSender = new (require('./handlers/WebSocketSender'))({port: config.webSockets.port});


	// BUILD NOTIFICATION HANDLER COLLECTION	
	var notificationHandlers = [
		// write to console
		function(notification){
			console.log('Received: ' + notification);
		},
		// send to tcp receiver
		function(notification){
			tcpSender.Send(notification);
		},
		// broadcast to web socket clients
		function(notification){
			wsSender.Broadcast(notification);
		}

	];


	// LISTENER
	var setUpConnection = function(connection){

		connection.on('data', function(data){
			var notification = data.toString();
			notificationHandlers.forEach(function(handler){
				handler(notification);
			});
		});
	
	};

	var server = n.createServer(function(connection){
		setUpConnection(connection);
	});

	server.listen(config.listener.port);

	console.log(pkg.name + ' listening on port ' + config.listener.port + '.');
	

})();