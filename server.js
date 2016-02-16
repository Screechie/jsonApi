var http = require('http');//const http
var url = require('url');//module for url resolution and parsing
var path = require('path');//modules for handling and transforming file paths
var fs = require('fs')//require file stream module

var items = [];

var server = http.createServer(function(request, response){
	if(request.method == 'GET'){
		response.end(JSON.stringify({"todo_items": items}));
	}
	else if(request.method == 'POST')
	{
		//response.setHeader("Access-Control-Allow-Origin","null");//Set Http response Headers for CORS
		//Try checking the incoming request body
		//console.log(request.data);
		 var str = "";
		 request.setEncoding("utf8");

		 // request.on("error",function(error){
		 // 	console.log(error.message);
		 // });
		 request.on("data", function(chunk){
			//console.log(data);
		 	str += chunk;
		});
		request.on("end", function(){
			console.log(str);
			items.push(str);
			console.log(items);
			response.end("hello");
			//response.end(JSON.stringify({"todo_items": items}));
		});

	}
	else if(request.method == 'DELETE'){
		//Remove item with specific id from the array
		items.splice();
	}
	else{
		response.write(request.method);
		}
	//response.end();//Terminate connections of incoming requests.
	
	//console.log(request);

	//Add strings received to messages array

});

server.listen(3000, function(){
	console.log("Listening on port 3000");
});