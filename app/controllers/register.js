const ACCOUNT = require("../models/accounts");
const SESSION = require("../models/login_sessions");
const JWT = require("../helpers/jwt");
const CALLBACK = require("../helpers/mongoose_callback");
const RESPONSE_STATUS = require("../../config/response_status");
const LOG = require("../../system/log");

module.exports = (req, res, fields, files) => {
	const USERNAME = fields.username;
	const PWD = fields.pwd;
	const ID = fields.id;
	const ROLE = fields.role;
	if (USERNAME && PWD && ID && ROLE) {
		ACCOUNT.findById(
			ID,
			CALLBACK(res, doc => {
				if (doc) {
					res.describe = "Duplicate id.";
					LOG.writeRequest(req, fields, files, res.describe);
					res.end();
				} else {
					ACCOUNT.find(
						{ username: USERNAME },
						CALLBACK(res, docs => {
							if (docs.length) {
								res.describe = "Duplicate username.";
								LOG.writeRequest(
									req,
									fields,
									files,
									res.describe
								);
								res.end();
							} else {
								ACCOUNT.create(
									{
										_id: ID,
										username: USERNAME,
										pwd: PWD,
										role: ROLE
									},
									CALLBACK(res, account => {
										if (account) {
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
											res.describe =
												"Failed to create new account.";
											res.end();
										}
									})
								);
							}
						})
					);
				}
			})
		);
	} else {
		res.describe = "Missing some account info.";
		res.end();
	}
};
