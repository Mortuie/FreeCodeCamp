var width = 750;
var height = 750;

var svg = d3.select("div")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var simulation = d3.forceSimulation()
	.force("charge", d3.forceManyBody().strength(-20))
	.force("center", d3.forceCenter(width / 2, height / 2))
	.force("link", d3.forceLink().id(link => link.id).strength(link => link.strength));

var checkWidthBounds = (x) => {
	if (x < 30) {
		return 30;
	} else if (x > width - 50) {
		return width - 50;
	} return x;
}

var checkHeightBounds = (y) => {
	if (y < 30) {
		return 30;
	} else if (y > height - 50) {
		return height - 50;
	} return y;
}

const dragDrop = d3.drag()
	.on("start", node => {
		node.fx = node.x;
		node.fy = node.y;
	})
	.on("drag", node => {
		simulation.alphaTarget(0.7).restart();
		node.fx = d3.event.x;
		node.fy = d3.event.y;
	})
	.on("end", node => {
		if (!d3.event.active) {
			simulation.alphaTarget(0);
		}
		node.fx = null;
		node.fy = null;
	});

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
		.attr("width", 20)
		.attr("height", 20);

	nodeElements.call(dragDrop);

	const textElements = svg.append("g")
		.selectAll("text")
		.data(nodes)
		.enter()
		.append("text")
		.text(node => node.country)
		.attr("font-size", 15)
		.attr("dx", 20)
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
			.attr("x", node => checkWidthBounds(node.x))
			.attr("y", node => checkHeightBounds(node.y));

		textElements
			.attr("x", node => checkWidthBounds(node.x))
			.attr("y", node => checkHeightBounds(node.y));

		linkElements
			.attr("x1", link => checkWidthBounds(link.source.x))
			.attr("y1", link => checkHeightBounds(link.source.y))
			.attr("x2", link => checkWidthBounds(link.target.x))
			.attr("y2", link => checkHeightBounds(link.target.y));

	});

	simulation.force("link", d3.forceLink().links(links));


});