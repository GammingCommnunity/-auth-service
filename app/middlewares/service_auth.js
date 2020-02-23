module.exports = (next, req, res, fields, files) => {
	if (
		req.headers.secret_key &&
		req.headers.secret_key === process.env.SERVICE_KEY
	) {
		next('hello world');
	} else {
		const RESPONSE = res.getResponse();
		RESPONSE.writeHead(403);
		RESPONSE.end();
	}
};
