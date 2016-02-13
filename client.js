$(function() {
	$("form").submit(function(event){
		event.preventDefault();	
		var current_item ={
			itemName: "",
			id: 0
		}

		$("button#addItem").on("click",function(event){
			event.preventDefault();
			//Ensure that empty items are not added
			if($("#item").val() === ""){
				alert("Empty fields are not allowed! Please enter an item.")
			}
			else{
				current_item.itemName = $("#item").val();
				current_item.id = current_item.id + 1;
				$.post("http://localhost:3000",current_item,function(data){
					console.log(data);
					console.log(current_item.itemName+" added!");
				});
			}
		});

		$("button#delItem").on("click", function(event){
			event.preventDefault();

			$.post("http://localhost:3000")

		});
	});
});