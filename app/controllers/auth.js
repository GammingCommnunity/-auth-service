const JWT = require("../helpers/jwt");
const LOG = require("../../system/log");
const RESPONSE_STATUS = require("../../config/response_status");
const LOGIN_SESSION = require("../models/login_sessions");
const CALLBACK = require("../helpers/mongoose_callback").callback;

module.exports = (req, res, fields, files) => {
	const TOKEN = req.headers["token"];
	if (TOKEN) {
		const DECODED = JWT.decode(TOKEN);
		if (DECODED) {
			const SESSION_ID = DECODED.ss;
			const ACCOUNT_ID = DECODED.id;
			if (SESSION_ID && ACCOUNT_ID) {
				LOGIN_SESSION.model.findById(
					SESSION_ID,
					CALLBACK(res, session => {
						if (session) {
							if (session.account_id === ACCOUNT_ID) {
								if (session.is_active) {
									res.status = RESPONSE_STATUS.SUCCESSFUL;
									res.end();
								} else {
									res.status =
										RESPONSE_STATUS.SESSION_EXPIRED;
									res.end();
								}
							} else {
								res.describe = "Fake account.";
								LOG.writeRequest(req, fields, files, {
									message: res.describe,
									token: TOKEN
								});
								res.end();
							}
						} else {
							res.describe = "Session not found";
							LOG.writeRequest(req, fields, files, {
								message: res.describe,
								token: TOKEN
							});
							res.end();
						}
					})
				);
			} else {
				res.describe = "Token format error.";
				LOG.writeRequest(req, fields, files, {
					message: res.describe,
					token: TOKEN
				});
				res.end();
			}
		} else {
			res.describe = "Wrong token.";
			LOG.writeRequest(req, fields, files, {
				message: res.describe,
				token: TOKEN
			});
			res.end();
		}
	} else {
		res.describe = "Missing the token.";
		LOG.writeRequest(req, fields, files, res.describe);
		res.end();
	}
};
