const RESPONSE_STATUS = require("../../config/response_status");

module.exports = (req, res, fields, files, middleware) => {
	res.status = RESPONSE_STATUS.SUCCESSFUL;
	res.data = fields;
	res.end();
};
