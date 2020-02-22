const RESPONSE_STATUS = require('../../system/auth_servive_response').status;

module.exports = (res, fields, files) => {
	res.status = RESPONSE_STATUS.SUCCESSFUL;
	res.data = fields;
	return res;
};
