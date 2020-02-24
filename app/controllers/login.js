const ACCOUNT = require("../models/accounts");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;
const BCRYPT = require("bcrypt-nodejs");
const RESPONSE_STATUS = require("../../config/response_status");
const JWT = require("../helpers/jwt");

module.exports = (req, res, fields, files) => {
	const USERNAME = fields.username;
	const PWD = fields.pwd;
	
	if (USERNAME && PWD) {
		ACCOUNT.model.findOne(
			{ username: USERNAME },
			SUCCESS_CALLBACK(
				res,
				"",
				account => {
					BCRYPT.compare(
						PWD,
						account.pwd.replace(/^\$2y/, "$2a"),
						(error, result) => {
							if (error) {
								res.describe = error;
								res.end();
							} else if (result) {
								JWT.generate(res, account._id, account.role);
							} else {
								res.status = RESPONSE_STATUS.WRONG_PWD;
								res.end();
							}
						}
					);
				},
				() => (res.status = RESPONSE_STATUS.ACC_NOT_FOUND)
			)
		);
	} else {
		res.describe = "Missing the username or password.";
		res.end();
	}
};
