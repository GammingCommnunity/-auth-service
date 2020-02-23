const ACCOUNT = require("../models/accounts");
const CALLBACK = require("../helpers/mongoose_callback");
const BCRYPT = require("bcrypt");
const RESPONSE_STATUS = require("../../config/response_status");
const SESSION = require("../models/login_sessions");
const JWT = require("../helpers/jwt");

module.exports = (req, res, fields, files) => {
	const USERNAME = fields.username;
	const PWD = fields.pwd;
	if (USERNAME && PWD) {
		ACCOUNT.findOne(
			{ username: USERNAME },
			CALLBACK(res, account => {
				if (account) {
					BCRYPT.compare(
						PWD,
						account.pwd.replace(/^\$2y/, "$2a"),
						(error, result) => {
							if (error) {
								res.describe = error;
								res.end();
							} else if (result) {
								SESSION.create(
									{},
									CALLBACK(res, session => {
										if (session) {
											res.status =
												RESPONSE_STATUS.SUCCESSFUL;
											res.data = JWT.encode(
												session._id,
												account._id,
												account.role
											);
											res.end();
										} else {
											res.describe =
												"Failed to create new session.";
											res.end();
										}
									})
								);
							} else {
								res.status = RESPONSE_STATUS.WRONG_PWD;
								res.end();
							}
						}
					);
				} else {
					res.status = RESPONSE_STATUS.ACC_NOT_FOUND;
					res.end();
				}
			})
		);
	} else {
		res.describe = "Missing the username or password.";
		res.end();
	}
};
