$(document).ready(function() {
	var wikiUrl = "https://en.wikipedia.org/w/api.php";
	var arrayOfData = [];


	$("#pressTest").on("click", function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});

	$("#searchWiki").on("click", function() {
		console.log($("#searchPhrase").val());
		wikiUrl += "?" + $.param({
			"action": "opensearch",
			"search": $("#searchPhrase").val(),
			"prop": "revisions",
			"rvprop": "content",
			"format": "json",
			"limit": 20,
		})


		$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function(data) {

			console.log(data);
			for (var i = 0; i < data[1].length; i++) {
				var temp = {};
				temp.title = data[1][i];
				temp.description = data[2][i];
				temp.link = data[3][i];
				arrayOfData.push(temp);
			}
			console.log(arrayOfData);
		}});

	});

	
	


	


});