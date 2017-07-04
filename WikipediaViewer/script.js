$(document).ready(function() {

	$("#pressTest").on("click", function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});

	
	var wikiUrl = "https://en.wikipedia.org/w/api.php";
	wikiUrl += "?" + $.param({
		"action": "opensearch",
		"search": "butterflies",
		"prop": "revisions",
		"rvprop": "content",
		"format": "json",
		"limit": 10,
	})


	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function(data) {
			console.log(data);
		}
	});


});