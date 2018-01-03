$(document).ready(function() {
	var wikiUrl = "https://en.wikipedia.org/w/api.php";
	var arrayOfData;


	$("#randomArticle").on("click", function() {
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
			arrayOfData = [];
			$("#container").html("");

			console.log(data);
			for (var i = 0; i < data[1].length; i++) {
				var temp = {};
				temp.title = data[1][i];
				temp.description = (data[2][i] === "") ? "No description given.": data[2][i];
				temp.link = data[3][i];
				arrayOfData.push(temp);
			}
			console.log(arrayOfData);

			for (var j = 0; j < arrayOfData.length; j++) {
				$("#container").append('<div class="item"><a href="' +
					arrayOfData[j].link +
					'" target="_blank"><p>' +
					arrayOfData[j].title + '</p><p>' +
					arrayOfData[j].description + '</p></a></div>'
				);}
		}});
	});
});