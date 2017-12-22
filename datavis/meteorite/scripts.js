const width = 1100;
const height = 550;
const lat_min = -90;
const lat_max = 90;
const long_min = -180;
const long_max = 180;


d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", (error, data) => {
	if (error) throw error;
	console.log(data.features[0].properties.reclong);

	min_mass = d3.min(data.features, d => parseInt(d.properties.mass));
	max_mass = d3.max(data.features, d => parseInt(d.properties.mass));

	console.log(min_mass + " " + max_mass);


	const xScale = d3.scaleLinear()
		.domain([long_min, long_max])
		.range([0, width]);

	const yScale = d3.scaleLinear()
		.domain([lat_min, lat_max])
		.range([height, 0]);

	const radialScale = d3.scaleLog()
		.domain([1e-6, max_mass])
		.range([1, 5]);


	var resizeRadius = (size) => {
		if (size === null || parseInt(size) <= 1e-6) {
			return 1e-6;
		} else {
			return radialScale(size);
		}
	}
	console.log(resizeRadius(0));


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



	const circles = svg.append("g")
		.selectAll("circle")
		.data(data.features)
		.enter()
		.append("circle")
		.attr("cx", d => xScale((d.properties.reclong)))
		.attr("cy", d => yScale(d.properties.reclat))
		.attr("r", d => resizeRadius(d.properties.mass))
		.attr("fill", "red");



	

});