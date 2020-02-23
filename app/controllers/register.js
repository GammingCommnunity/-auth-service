const ACCOUNT = require("../models/accounts");
const SESSION = require("../models/login_sessions");
const JWT = require("../helpers/jwt");
const CALLBACK = require("../helpers/mongoose_callback");
const RESPONSE_STATUS = require("../../system/response").status;

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
					res.data = doc;
					res.describe = "ID";
					res.end();
				} else {
					ACCOUNT.find(
						{ username: USERNAME },
						CALLBACK(res, docs => {
							if (docs.length) {
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
									CALLBACK(res, account => {
										SESSION.create(
											{},
											CALLBACK(res, session => {
												res.status =
													RESPONSE_STATUS.SUCCESSFUL;
												res.data = JWT.encode(
													session._id,
													account._id,
													account.role
												);
												res.end();
											})
										);
									})
								);
							}
						})
					);
				}
			})
		);
	} else {
		res.describe = "missing some account info";
		res.end();
	}
};
