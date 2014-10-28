$(function(){
/***** VISUALIZATION *****/

	// Grey-out all elements when over
	$(".list-1 > li, .list-2 > li, button[class^=\"cat-\"], button[class^=\"type-\"]").mouseover(function() {
		var currentClass = $(this).attr("class").split(" ")[0];
		if(currentClass != 'empty'){
			$(".main > li").addClass("deactivate");
			$("." + currentClass).removeClass("deactivate");
		}
	});

	// Show element name and grey-out all elements when over
	$(".main > li").mouseover(function() {
		var currentClass = $(this).attr("class").split(" ")[0];
		if(currentClass != "empty" && currentClass != "grid") {
			$(".main > li").addClass("deactivate");
			$(this).removeClass("deactivate");
			$(this).find("span").css("display", "block");
			$(this).find("span").addClass("elementName");
		}
	});

	// Hide all metals
	$("#non-metals").mouseover(function() {
		$(".main > li.type-3, .main > li.type-4, .main > li.type-6, .main > li.type-7, .main > li.type-8, .main > li.type-9").addClass("deactivate");
	});

	// Hide non-metals
	$("#all-metals").mouseover(function() {
		$(".main > li.type-0, .main > li.type-1, .main > li.type-2, .main > li.type-5").addClass("deactivate");
	});

	// Hide element name and colorize all elements when out
	$("li, button").mouseout(function() {
		var currentClass = $(this).attr("class").split(" ")[0];
		$(".main > li").removeClass("deactivate");
		//$(this).find("span").css("display", "none");
		$(this).find("span").removeClass("elementName");
	});

/***** SEARCH *****/

	// Adding single elements to the search
	$(".main > li").click(function() {
		var text = $("#searchText").val();
		if(text == "") {
			$("#searchText").val($(this).attr("data-symbol"));
		}
		else {
			var booloperator = " & ";	
			if(text.charAt(text.length-1)==" " && 
				(text.charAt(text.length-2)=="&" | text.charAt(text.length-2)=="~" | text.charAt(text.length-2)=="|" | text.charAt(text.length-2)=="^" | text.charAt(text.length-3)=="(")) {
				booloperator = "";
			}
			$("#searchText").val(text + booloperator + $(this).attr("data-symbol"));		
		}
		$("#searchText").focus();
	});

	// Adding group of elements
	$(".list-1 > li, .list-2 > li, button[class^=\"cat-\"], button[class^=\"type-\"]").click(function() {
		var text = "( ";
		var currentClass = $(this).attr("class").split(" ")[0];
		if(currentClass != 'empty'){
			$("." + currentClass).each(function(key, value) {
				if($(this).attr("data-symbol") !== undefined) {				
					if(text != "( ") text += " | ";					
					text += $(this).attr("data-symbol");
				}
			});
			text += " )";
			$("#searchText").val(text);
		}
		$("#searchText").focus();
	});

	// Adding all metals
	$("#all-metals").click(function() {
		var arr = [".main > li.type-3", ".main > li.type-4", ".main > li.type-6", ".main > li.type-7", ".main > li.type-8", ".main > li.type-9"];
		var text = "( ";
		$.each(arr, function(k,v) {
			$(v).each(function(key,value) {
				if($(this).attr("data-symbol") !== undefined) {				
					if(text != "( ") text += " | ";					
					text += $(this).attr("data-symbol");
				}
			});
		});
		text += " )";
		$("#searchText").val(text);
		$("#searchText").focus();
	});

	// Adding non-metals
	$("#non-metals").click(function() {
		var arr = [".main > li.type-0", ".main > li.type-1", ".main > li.type-2", ".main > li.type-5"];
		var text = "( ";
		$.each(arr, function(k,v) {
			$(v).each(function(key,value) {
				if($(this).attr("data-symbol") !== undefined) {				
					if(text != "( ") text += " | ";					
					text += $(this).attr("data-symbol");
				}
			});
		});
		text += " )";
		$("#searchText").val(text);
		$("#searchText").focus();
	});
	// Adding &
	$("#bool-and").click(function() {
		var text = $("#searchText").val();
		if(text != "") {
			$("#searchText").val(text + " & ");
		}
		$("#searchText").focus();
	});
	// Adding ~
	$("#bool-not").click(function() {
		var text = $("#searchText").val();
		$("#searchText").val(text + " ~ ");
		$("#searchText").focus();
	});
	// Adding |
	$("#bool-or").click(function() {
		var text = $("#searchText").val();
		if(text != "") {
			$("#searchText").val(text + " | ");
		}
		$("#searchText").focus();
	});
	// Adding ^
	$("#bool-xor").click(function() {
		var text = $("#searchText").val();
		if(text != "") {
			$("#searchText").val(text + " ^ ");
		}
		$("#searchText").focus();
	});
	// Adding (
	$("#open-brkt").click(function() {
		var text = $("#searchText").val();
		$("#searchText").val(text + " ( ");
		$("#searchText").focus();
	});
	// Adding )
	$("#close-brkt").click(function() {
		var text = $("#searchText").val();
		if(text != "") {
			$("#searchText").val(text + " ) ");
		}
		$("#searchText").focus();
	});

	// Clean-up search bar
	$("#clear_button").click(function() {
		$("#searchText").val("");
		$('#elementText').val('');$('#elementText').focus();
	});
/******* RESULTS ******/
	$("button#reset").click( function() {
		window.location.reload(true);
		window.location.href="index.html";
	});

	$("button#modify").click( function() {
		$("div#search_container").slideDown("slow");
		$("#research_buttons").fadeOut();
		$('#top').animatescroll({scrollSpeed:1000, easing: "easeInOutCubic"});$('#elementText').focus();
	});

	$(":submit").click( function() {
		$("#research_buttons").fadeIn(200);
		$("#result_frame").height( "1800px" );
		$('#research').animatescroll({scrollSpeed:500, easing: "easeInOutCubic"});  
	});
}); 
