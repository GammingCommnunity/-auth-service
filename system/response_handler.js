module.exports = (res, responseObject) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.write(JSON.stringify(responseObject));
	res.end();
};
