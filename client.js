$(function() {
	$("form").submit(function(event){
		event.preventDefault();	
		// var itemArray = [];
		var current_item ={
			itemName: "",
			id: 0
		}

		$("button#addItem").on("click",function(event){
			event.preventDefault();

			current_item.itemName = $("#item").val();
			current_item.id = current_item.id + 1;
			console.log(current_item);
			$.post("http://localhost:3000",current_item,function(data){
				console.log(data);
				console.log(current_item.itemName+" added!");
			});
			// itemArray.push(JSON.stringify(current_item));

			//console.log("id:" + current_item.id); 
			// console.log("item:"+current_item.itemName); 
			//console.log("Array:"+itemArray);				
		});
	});
});