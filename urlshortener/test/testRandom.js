var assert = require("assert");
var hf = require("./../js/helperFunctions.js");

it("should give us a random number between 0 and 9999", () => {
	const num = hf.getRandomNumber();
	console.log(num);
	assert("Number", typeof num);
});