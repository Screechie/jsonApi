$(function() {
	$("form").submit(function(event){
		event.preventDefault();	
		// var itemArray = [];
		var current_item ={
			itemName: "",
			id: 0
		}

		$("#addItem").on("click",function(event){
			event.preventDefault();

			current_item.itemName = $("#item").val();
			current_item.id = current_item.id + 1;
			$.post("http://localhost:3000/",current_item,function(){
				console.log(current_item.itemName+" added!");

			});
			// itemArray.push(JSON.stringify(current_item));

			//console.log("id:" + current_item.id); 
			// console.log("item:"+current_item.itemName); 
			//console.log("Array:"+itemArray);				
		});
	});
});