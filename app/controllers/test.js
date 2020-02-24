const RESPONSE_STATUS = require("../../config/response_status");

module.exports = (req, res, fields, files, middleware) => {
	res.end(RESPONSE_STATUS.SUCCESSFUL, fields);
};
