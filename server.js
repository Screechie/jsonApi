var http = require('http');

var server = http.createServer(function(request, response){
	response.write("Hello Node!!");
	response.end();
	console.log(request.headers);
});

server.listen(3000, function(){
	console.log("Listening on port 3000");
});