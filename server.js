const http = require('http');//const http
var url = require('url');//module for url resolution and parsing
var join = require('path').join;//modules for handling and transforming file paths
var fs = require('fs')//require file stream module
var qs = require('querystring');//Allow users to perform Get requests using query strings

var items = [];
var root = __dirname;//Get root directory

function idExists(searchId){
		for(i=0; i<items.length;i++){
			if(items[i].id === searchId)
				return true;
		}
		return false;
	} 

var server = http.createServer(function(request, response){
	
	//Prevent browser from making favicon request
	if(request.url === '/favicon.ico'){
		response.writeHead(200, {"Content-Type" : "image/x-icon" });
		response.end();
		return;
	}	
	
	if(request.method === 'GET'){

		var reqUrl = request.url;
		
		parsedUrl = url.parse(reqUrl);
		// console.log(parsedUrl);
		// console.log( typeof parsedUrl.pathname);

		var path = join(root, parsedUrl.pathname);
		//console.log("path: "+ path);
		var id = url.parse(request.url).pathname.split('/')[2];
		console.log(reqUrl);
		//Get all items
		if(reqUrl === '/'){			
			request.setEncoding('utf8');
			response.end(JSON.stringify(items));				
		}
		//Get a specific item
		else if(reqUrl === '/items/'+id){
			// console.log(typeof id);
			// console.log(id);
			var item;

			for(i=0; i<items.length; i++){
					if(idExists(parseInt(id))){
						item = JSON.stringify(items[i]);
						break;
						//response.end(JSON.stringify(items[i]));	
					}
					// else{
					// 	response.end("Item not found!");
					// }				
				}
			//response.end();	
				if(item == undefined){
					response.end(JSON.stringify({"error": "Item not found"}));
				}
				else{
					response.end(item);
				}
		}

		

		// var url = url.parse(request.url);

		// console.log(url);

		//separate by query string
		var query = url.parse(request.url,true).query;

		//Return all items if a query string is not specified
		// if(query == ""){
		// 	for(i=0;i<items.length;i++)
		// 	response.end(JSON.stringify({"todo_items": items[i]}));
		// }

		// console.log("query: ");
		// console.log(query);
		// console.log(request);
		// console.log(request.url);

		// //Parse url for query to obtain specific items from Array
		// var query = url.parse(request.url).query;

		// console.log("query: ");
		// console.log(query);

		//Use querystring module to parse query and get separate ids
		// var id = qs.parse(query);
		// var item;
		// console.log(id);
		// for(i=0;i<id.length;i++){
		// 	response.end(JSON.stringify({"todo_items": items[i]}));
		// }






		// var path = join(root, reqUrl.path);
		//console.log(reqUrl);
		// console.log(reqUrl.query);
		// console.log("path: "+path);
		// console.log(request.rawHeaders[1]+" made a GET request");
		
	}

	else if(request.method === 'POST' && request.url === '/'){

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

				//set values of current item for each item
				currentItem.itemName = item[i];
				currentItem.id = id;

				//Check if id already exists in the array and change it if necessary to avoid duplicates
				if(idExists(id))
					currentItem.id = items[items.length - 1].id + 1;

				items.push(currentItem);
			}			

			console.log("The user entered the following items: ");
			for(i=0;i<items.length;i++){
				console.log(items[i]);
			}

			console.log(JSON.stringify({"todo_items": items}));
			response.end(JSON.stringify({"todo_items": items}));

		});

	}

	else if(request.method === 'DELETE'){

			var id = url.parse(request.url).pathname.split('/')[2];

			if(request.url === '/'){
				console.log("Deleting all items is dangerous!!");
				console.log("Are you sure you want to continue?");
			}

			if(request.url === '/items/'+id+'/delete'){

				console.log("A delete request was made to delete id "+id+"!");

				for(i=0; i<items.length; i++){
					if(idExists(parseInt(id))){
						items.splice(parseInt(id)-1,1);
						break;
					}
				}	
			}
			response.end("Item "+id+" has been deleted!");
		
	
		
		//Parse url to obtain ID to be deleted from query string

		
	}
	// else{
	// 	response.write(request.method);
	// 	}
	//response.end();//Terminate connections of incoming requests.

	//console.log(request);

	//Add strings received to messages array

});

//Updates
//http://localhost:3000/items/1/edit

server.listen(3000, function(){
	console.log("Listening on port 3000");
});
