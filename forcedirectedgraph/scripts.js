var width = 750;
var height = 750;


var svg = d3.select("div")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var simulation = d3.forceSimulation()
	.force("charge", d3.forceManyBody().strength(-5))
	.force("center", d3.forceCenter(width / 2, height / 2))
	.force("link", d3.forceLink().id(link => link.id).strength(link => link.strength));

d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", (error, data) => {
	if (error) throw error;

	var links = data.links;
	var nodes = data.nodes;

	console.log(nodes);


	const nodeElements = svg.append("g")
		.selectAll("image")
		.data(nodes)
		.enter()
		.append("svg:image")
		.attr("xlink:href", d => "flags/" + d.code + ".png")
		.attr("width", 10)
		.attr("height", 10);

	const textElements = svg.append("g")
		.selectAll("text")
		.data(nodes)
		.enter()
		.append("text")
		.text(node => node.country)
		.attr("font-size", 15)
		.attr("dx", 15)
		.attr("dy", 15);

	const linkElements = svg.append("g")
		.selectAll("line")
		.data(links)
		.enter()
		.append("line")
		.attr("stroke-width", 1)
		.attr("stroke", "#E5E5E5");



	simulation.nodes(nodes).on("tick", () => {
		nodeElements
			.attr("x", node => node.x)
			.attr("y", node => node.y);

		textElements
			.attr("x", node => node.x)
			.attr("y", node => node.y);

		linkElements
			.attr("x1", link => link.source.x)
			.attr("y1", link => link.source.y)
			.attr("x2", link => link.target.x)
			.attr("y2", link => link.target.y);

	});

	simulation.force("link", d3.forceLink().links(links));


});