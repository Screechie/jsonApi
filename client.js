$(function() {
		//Comment Change
	$("form").submit(function(event){
		event.preventDefault();	
		var current_item ={
			itemName: "",
			id: 0
		};

		$("#addItem").on("click",function(event){
			event.preventDefault();
			//Ensure that empty items are not added
			if($("#item").val() === ""){
				alert("Empty fields are not allowed! Please enter an item.");
			}
			else{
				current_item.itemName = $("#item").val();
				current_item.id = current_item.id + 1;
				// $.post("http://localhost:3000/",current_item,function(data){
				// 	console.log(current_item.itemName+" added!");
				// });
				$.post("/", JSON.stringify(current_item)).done(function ( data ) {
					$("#trackItems").html("<ul><li>Item "+current_item.itemName+"added with id: "+current_item.id+"</li></ul>");
				//console.log(data);
				});

				$("#item").val("");//clear input field after submit
			}
		});

		$("button#delItem").on("click", function(event){
			event.preventDefault();

			// $.ajax({
			// 	url: "http://localhost:3000",
			// 	type: "DELETE",
			// 	success: function(id){
			// 		JSON.stringify(current_item.id)
			// 	}
			// });


		});
	});
});