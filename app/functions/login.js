const RESULT = require('../common/auth_service_result');
const Account = require('../models/accounts');

module.exports = (req, res) => {
	const USERNAME = req.body.username;
	const PWD = req.body.pwd;
	if (USERNAME && PWD) {
		const ACC = Account.find({username: USERNAME});
		
	} else {
		RESULT.describe = "missing the username or password";
	}

	res.json(RESULT);
};
