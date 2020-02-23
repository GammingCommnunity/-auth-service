const SERVICE_KEY = require("../../config/app").SERVICE_KEY;

module.exports = (next, req, res, fields, files) => {
	if (req.headers.secret_key && req.headers.secret_key === SERVICE_KEY) {
		next();
	} else {
		const RESPONSE = res.getResponse();
		RESPONSE.writeHead(403);
		RESPONSE.end();
	}
};
