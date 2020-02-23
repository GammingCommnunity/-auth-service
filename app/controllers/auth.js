const JWT = require("../helpers/jwt");
const LOG = require("../../system/log");
const RESPONSE_STATUS = require("../../config/response_status");

module.exports = (req, res, fields, files) => {
	const TOKEN = req.headers["token"];
	if (TOKEN) {
		const DECODED = JWT.decode(TOKEN);
		if (DECODED) {
			res.status = RESPONSE_STATUS.SUCCESSFUL;
		} else {
			res.describe = "wrong token";
			LOG.writeRequest(req, fields, files, res.describe);
		}
	} else {
		res.describe = "missing the token";
		LOG.writeRequest(req, fields, files, res.describe);
	}

	res.end();
};
