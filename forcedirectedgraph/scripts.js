var width = 500;
var height = 500;


var svg = d3.select("div")
	.append("svg")
	.attr("width", width)
	.attr("height", height);



d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", (error, data) => {
	if (error) throw error;

	var links = data.links;
	var nodes = data.nodes;

	console.log(nodes);


});