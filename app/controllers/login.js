const ACCOUNT = require("../models/accounts");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;
const BCRYPT = require("bcryptjs");
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
					BCRYPT.compare(PWD, account.pwd, (error, result) => {
						if (error) {
							res.end(
								RESPONSE_STATUS.FAILED,
								null,
								error.message
							);
						} else if (result) {
							JWT.generate(res, account._id, account.role);
						} else {
							res.end(RESPONSE_STATUS.WRONG_PWD);
						}
					});
				},
				() => res.end(RESPONSE_STATUS.WRONG_USERNAME)
			)
		);
	} else {
		res.end(
			RESPONSE_STATUS.FAILED,
			null,
			"Missing the username or password."
		);
	}
};
