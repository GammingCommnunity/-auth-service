const ACCOUNT = require("../models/accounts");

module.exports = (res, fields, files) => {
	const USERNAME = req.body.username;
	const PWD = req.body.pwd;
	if (USERNAME && PWD) {
		const ACC = ACCOUNT.find({ username: USERNAME });
	} else {
		res.describe = "missing the username or password";
	}

	return res;
};
