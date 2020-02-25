const ACCOUNTS = require("../models/accounts");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;
const BCRYPT = require("bcryptjs");
const RESPONSE_STATUS = require("../../config/response_status");
const JWT = require("../helpers/jwt");
const ACCOUNT_STATUS = require("../common/enums").AccountStatus;

module.exports = (req, res, fields, files) => {
	const USERNAME = fields.username;
	const PWD = fields.pwd;

	if (USERNAME && PWD) {
		ACCOUNTS.model.findOne(
			{ username: USERNAME },
			SUCCESS_CALLBACK(
				res,
				"",
				account => {
					if (account.status === ACCOUNT_STATUS.ACTIVATED) {
						BCRYPT.compare(PWD, account.pwd, (error, result) => {
							if (error) {
								res.end(
									RESPONSE_STATUS.FAILED,
									null,
									error.message
								);
							} else if (result) {
								JWT.generate(
									res,
									account._id,
									account.role,
									account.status
								);
							} else {
								res.end(RESPONSE_STATUS.WRONG_PWD);
							}
						});
					} else if (
						account.status === ACCOUNT_STATUS.BANNED
					) {
						res.end(RESPONSE_STATUS.IS_BANNED_ACCOUNT);
					} else if (
						account.status === ACCOUNT_STATUS.UNACTIVATED
					) {
						res.end(RESPONSE_STATUS.IS_UNACTIVATED_ACCOUNT);
					} else {
						res.end(
							RESPONSE_STATUS.FAILED,
							null,
							"Account statuses error."
						);
					}
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
