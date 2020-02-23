const JWT = require("jsonwebtoken");

exports.encode = (sessionCode, accountId, role) => {
	return JWT.sign({ ss: sessionCode, id: accountId, rl: role }, process.env.AUTH_KEY, {
		algorithm: "HS512",
		noTimestamp: true
	});
};

exports.decode = token => {
	let decoded = null;
	try {
		decoded = JWT.verify(token, process.env.AUTH_KEY);
	} catch (error) {}
	return decoded;
};
