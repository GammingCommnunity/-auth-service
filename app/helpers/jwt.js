const JWT = require("jsonwebtoken");
const AUTH_KEY = require("../../config/app").AUTH_KEY;

exports.encode = (sessionCode, accountId, role) => {
	return JWT.sign({ ss: sessionCode, id: accountId, rl: role }, AUTH_KEY, {
		algorithm: "HS512",
		noTimestamp: true
	});
};

exports.decode = token => {
	let decoded = null;
	try {
		decoded = JWT.verify(token, AUTH_KEY);
	} catch (error) {}
	return decoded;
};
