const ACCOUNT = require("../models/accounts");
const SESSION = require("../models/login_sessions");
const JWT = require("../helpers/jwt");
const ERROR_HANDLE = require("../helpers/mongoose_error_handle");
const RESPONSE_STATUS = require("../../system/response").status;

module.exports = (res, fields, files) => {
	const USERNAME = fields.username;
	const PWD = fields.pwd;
	const ID = fields.id;
	const ROLE = fields.role;
	if (USERNAME && PWD && ID && ROLE) {
		ACCOUNT.findById(ID).exec((error, doc) => {
			if (ERROR_HANDLE(res, error)) {
				if (doc) {
					res.data = doc;
					res.describe = "ID";
					res.end();
				} else {
					ACCOUNT.find({ username: USERNAME }, (error, doc) => {
						if (ERROR_HANDLE(res, error)) {
							if (doc.length) {
								res.data = doc;
								res.describe = "USERNAME";
								res.end();
							} else {
								ACCOUNT.create(
									{
										_id: ID,
										username: USERNAME,
										pwd: PWD,
										role: ROLE
									},
									(error, account) => {
										if (ERROR_HANDLE(res, error)) {
											SESSION.create(
												{},
												(error, session) => {
													if (
														ERROR_HANDLE(res, error)
													) {
														res.status =
															RESPONSE_STATUS.SUCCESSFUL;
														res.data = JWT.encode(
															session._id,
															account._id,
															account.role
														);
														res.end();
													}
												}
											);
										}
									}
								);
							}
						}
					});
				}
			}
		});
	} else {
		res.describe = "missing some account info";
		res.end();
	}
};
