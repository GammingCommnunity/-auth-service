const ACCOUNT = require("../models/accounts");
const JWT = require("../helpers/jwt");

module.exports = (req, res, fields, files) => {
	ACCOUNT.create(
		res,
		fields.username,
		fields.pwd,
		fields.id,
		fields.role,
		account => JWT.generate(res, account._id, account.role)
	);
};
