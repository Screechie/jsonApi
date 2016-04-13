const http = require('http');//const http
var url = require('url');//module for url resolution and parsing
var join = require('path').join;//modules for handling and transforming file paths
var fs = require('fs')//require file stream module
var qs = require('querystring');//Allow users to perform Get requests using query strings??
var _ = require('lodash');

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
	//Read items
	if(request.method === 'GET'){

		var reqUrl = request.url;
		
		parsedUrl = url.parse(reqUrl);
		// console.log(parsedUrl);
		// console.log( typeof parsedUrl.pathname);

		var path = join(root, parsedUrl.pathname);
		//console.log("path: "+ path);
		var id = url.parse(request.url).pathname.split('/')[2];
		console.log(reqUrl);

		if(reqUrl === "/"){
			response.end(JSON.stringify({"error": "Invalid Request!!"}))
		}
		//Get all items
		else if(reqUrl === '/items'){			
			request.setEncoding('utf8');
			response.end(JSON.stringify(items));				
		}
		//Get a specific item
		else if(reqUrl === '/items/'+id){
			var item;

			for(i=0; i<items.length; i++){
				if(idExists(parseInt(id))){
					item = JSON.stringify(items[i]);
					break;
				}
			}
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

		
		// var path = join(root, reqUrl.path);
		//console.log(reqUrl);
		// console.log(reqUrl.query);
		// console.log("path: "+path);
		// console.log(request.rawHeaders[1]+" made a GET request");
		
	}
	//Create items
	else if(request.method === 'POST' && request.url === '/items'){

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

				//Check if id already exists in the array and increment if necessary for uniqueness
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

	//Handle Deletions
	else if(request.method === 'DELETE'){

		var id = url.parse(request.url).pathname.split('/')[2];

		if(request.url === '/items/delete' && items.length > 0){
			items.length = 0;
			response.write(JSON.stringify({"Warning": "Deleting all items is dangerous!"}));
			response.end(JSON.stringify({"Entire List Deleted": items}));
		}
		else if(request.url === '/items/delete' && items.length == 0){
			response.end(JSON.stringify({"Error":"ItemStore is already empty!!"}));
		}
		else if(request.url === '/items/'+id+'/delete' && items.length > 0){

			console.log("A delete request was made to delete id "+id+"!");
			console.log("idExists: " + idExists(parseInt(id)));

			for(i=0; i<items.length; i++){
				if(idExists(parseInt(id))){
					console.log("Found the item to be deleted!!");
					items.splice(_.findIndex(items,function(element){
						return element.id === parseInt(id);
					}),1);
					break;
				}
				else{
					response.end(JSON.stringify({"Error": "Item does not exist or was deleted previously!"}));
				}
			}				
		response.end("Item "+id+" has been deleted!");	
		}
		else if(request.url === '/items/'+id || request.url === '/items'){
			response.end(JSON.stringify({"Error":"Invalid Request!"}));
		}
		else{
			response.end(JSON.stringify({"Error":"ItemStore is already empty!!"}));
		}					
	}
	
	//Handle Updates or edit items
	else if(request.method === 'PUT'){

		var id = url.parse(request.url).pathname.split('/')[2];

		if(request.url === '/items'){

		}

		if(request.url === '/items/'+id+'/edit'){

			var str = "";
			request.setEncoding("utf8");

			request.on("data", function(chunk){
				str += chunk;
			});

			request.on("end", function(){
				//Check to ensure that id already exists. Direct user to do a post request if id does not exist
				for(i=0; i<items.length; i++){
					if(idExists(parseInt(id))){
						items[i].itemName = str;
						console.log(items[i].itemName);
						break;
					}
					else{
						response.end(JSON.stringify({"Error": "Item does not exist. Submit a POST request to create a new item!"}));
					}					
				}
				response.end(JSON.stringify({"Upate":"Item update complete!"}));
			});
		}		
	}
	else{
		response.end(JSON.stringify({"Error": "Invalid Request"}));
	}


});

//Updates
//http://localhost:3000/items/1/edit

server.listen(3000, function(){
	console.log("Listening on port 3000");
});
