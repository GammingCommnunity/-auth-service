module.exports = (req, res) => {
	let result = "hello world";

	res.type("application/json");
	res.write(JSON.stringify(result));
	res.end();
};
