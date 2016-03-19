const http = require('http');//const http
var url = require('url');//module for url resolution and parsing
var join = require('path').join;//modules for handling and transforming file paths
var fs = require('fs')//require file stream module
var qs = require('querystring');//Allow users to perform Get requests using query strings

var items = [];
var root = __dirname;//Get root directory
console.log("root: "+root);
console.log("url object: "+url);

var server = http.createServer(function(request, response){
	//Prevent browser from making favicon request
	if(request.url === '/favicon.ico'){
		response.writeHead(200, {"Content-Type" : "image/x-icon" });
		response.end();
		return;
	}
	
	if(request.method == 'GET'){
		//Parse url for query to obtain specific items from Array
		var query = url.parse(request.url).query;

		console.log("query: "+query);

		//Use querystring module to parse query and get separate ids
		var id = qs.parse(query);
		var item;
		console.log(id);
		for(i=0;i<id.length;i++){
			response.end(JSON.stringify({"todo_items": items[i]}));
		}
		// var path = join(root, reqUrl.path);
		//console.log(reqUrl);
		// console.log(reqUrl.query);
		// console.log("path: "+path);
		// console.log(request.rawHeaders[1]+" made a GET request");
		
	}
	else if(request.method == 'POST' && request.url == '/')
	{
		var str = "";

		//necessary to receive data as utf-8 strings or buffer objects will be received instead
		request.setEncoding("utf8");

		request.on("data", function(chunk){
			str += chunk;
		});

		request.on("end", function(){

			//List item object
			var list_Item = function(){
				this.itemName = "";
				this.id = 0;
			};			

			/*Split stream by new line character to get separate
			TODO items and then push them to the Array*/
			var item = str.split('\n');

			console.log("The items entered were: ");
			
			for(i=0; i<item.length; i++){

				//Needs to be inside loop in order for a new object to be created on each iteration
				var currentItem = new list_Item();

				var id = i + 1;

				console.log("item "+ id + " is " + item[i]);
				console.log("item " + id + " has and id of " + id);

				//set values of current item for each item
				currentItem.itemName = item[i];
				currentItem.id = id;	
				console.log("current item: ");
				console.log(currentItem);		
				items.push(currentItem);
				// continue;

			}

			

			console.log("items: ");
			for(i=0;i<items.length;i++){
				console.log(items[i]);
			}

			response.end(JSON.stringify({"todo_items": items}));

		});

	}
	else if(request.method == 'DELETE'){
		//Parse url to obtain ID to be deleted
		
	}
	// else{
	// 	response.write(request.method);
	// 	}
	//response.end();//Terminate connections of incoming requests.

	//console.log(request);

	//Add strings received to messages array

});

server.listen(3000, function(){
	console.log("Listening on port 3000");
});
