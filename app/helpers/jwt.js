const JWT = require("jsonwebtoken");
const PRIVATE_KEY = require("../../config/app").PRIVATE_KEY;
const LOGIN_SESSION = require("../models/login_sessions");
const RESPONSE_STATUS = require("../../config/response_status");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;

const ENCODE = (sessionCode, accountId, role) => {
	return JWT.sign({ ss: sessionCode, id: accountId, rl: role }, PRIVATE_KEY, {
		algorithm: "HS512",
		noTimestamp: true
	});
};

const DECODE = token => {
	let decoded = null;
	try {
		decoded = JWT.verify(token, PRIVATE_KEY);
	} catch (error) {}
	return decoded;
};

const GENERATE = (res, accountId, accountRole) => {
	LOGIN_SESSION.model.create(
		{
			account_id: accountId
		},
		SUCCESS_CALLBACK(res, "Failed to create new session.", session => {
			res.end(
				RESPONSE_STATUS.SUCCESSFUL,
				ENCODE(session._id, accountId, accountRole)
			);
		})
	);
};

exports.encode = ENCODE;
exports.decode = DECODE;
exports.generate = GENERATE;
