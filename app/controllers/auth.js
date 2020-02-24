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
									res.end(RESPONSE_STATUS.SUCCESSFUL);
								} else {
									res.end(RESPONSE_STATUS.SESSION_EXPIRED);
								}
							} else {
								LOG.writeRequest(req, fields, files, {
									message: "Fake account.",
									token: TOKEN
								});
								res.end(
									RESPONSE_STATUS.FAILED,
									null,
									"Fake account."
								);
							}
						} else {
							LOG.writeRequest(req, fields, files, {
								message: "Session not found",
								token: TOKEN
							});
							res.end(
								RESPONSE_STATUS.FAILED,
								null,
								"Session not found"
							);
						}
					})
				);
			} else {
				LOG.writeRequest(req, fields, files, {
					message: "Token format error.",
					token: TOKEN
				});
				res.end(RESPONSE_STATUS.FAILED, null, "Token format error.");
			}
		} else {
			LOG.writeRequest(req, fields, files, {
				message: "Wrong token.",
				token: TOKEN
			});
			res.end(RESPONSE_STATUS.FAILED, null, "Wrong token.");
		}
	} else {
		LOG.writeRequest(req, fields, files, "Missing the token.");
		res.end(RESPONSE_STATUS.FAILED, null, "Missing the token.");
	}
};
