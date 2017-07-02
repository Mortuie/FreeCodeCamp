$(document).ready(function() {

	$("#pressTest").on("click", function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});

	$.ajax({
		url: niggga,
		data: queryData,
		dataType, "json",
		type: "POST",
		headers: {"Api-User-Agent": "Example/1.0"}.
		success: function(data) {
			console.log(data);
		}

	});

});