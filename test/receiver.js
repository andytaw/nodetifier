
(
function(){
	
	var n = require('net');
	
	var s = n.createServer(function(c){
		c.on('data', function(data){
			console.log(data.toString());
		})
	});

	s.listen(23024);
	
	console.log('Listening on 23024...');
	
}
)();