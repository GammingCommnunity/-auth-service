const RESPONSE_STATUS = require('../../system/response').status;

module.exports = (req, res, fields, files, middleware) => {
	res.status = RESPONSE_STATUS.SUCCESSFUL;
	res.data = middleware;
	res.end();
};
