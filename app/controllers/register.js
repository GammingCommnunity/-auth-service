const ACCOUNTS = require("../models/accounts");
const JWT = require("../helpers/jwt");

module.exports = (req, res, fields, files) => {
	ACCOUNTS.create(
		res,
		fields.username,
		fields.pwd,
		fields.id,
		fields.role,
		fields.status,
		account => JWT.generate(res, account._id, account.role, account.status)
	);
};
