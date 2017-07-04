$(document).ready(function() {
	var search = "";

	$("#pressTest").on("click", function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});

	$("#searchWiki").on("click", function() {

	});

	
	var wikiUrl = "https://en.wikipedia.org/w/api.php";
	wikiUrl += "?" + $.param({
		"action": "opensearch",
		"search": "",
		"prop": "revisions",
		"rvprop": "content",
		"format": "json",
		"limit": 20,
	})


	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function(data) {
			console.log(data[3]);
		}
	});


});