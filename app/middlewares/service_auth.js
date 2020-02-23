const SERVICE_KEY = require("../../config/app").SERVICE_KEY;
const LOG = require("../../system/log");

module.exports = (next, req, res, fields, files) => {
	if (req.headers.secret_key && req.headers.secret_key === SERVICE_KEY) {
		next();
	} else {
		LOG.writeRequest(req, fields, files, "access denied");
		res.forbiddenResponse();
	}
};
