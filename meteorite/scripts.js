var width = 1100;
var height = 550;

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", (error, data) => {
	if (error) throw error;

	const svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	const map = svg.append("image")
		.attr("width", width)
		.attr("height", height)
		.attr("x", 0)
		.attr("y", 0)
		.attr("transform", "translate(0, 0) scale(1)")
		.attr("xlink:href", "world_map.png");



});