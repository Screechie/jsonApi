var http = require('http');//const http??
var url = require('url');

var items = [];

var server = http.createServer(function(request, response){
	if(request.method == 'GET'){
		response.end(JSON.stringify({"todo_items": items}));
	}
	else if(request.method == 'POST')
	{
		//console.log(request);
		//items.push(request.);
		 var str = "";
		 request.setEncoding("utf8");
		 request.on("data", function(data){
			console.log(data);
		 	str += data;
		});
		request.on("end", function(){
			console.log(str);
			response.end(JSON.stringify({"todo_items": items}));
		});

	}
	else{
		response.write(request.method);
		}
	response.end();//Terminate connections of incoming requests.
	
	//console.log(request);

	//Add strings received to messages array

});

server.listen(3000, function(){
	console.log("Listening on port 3000");
});