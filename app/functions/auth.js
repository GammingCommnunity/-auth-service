const JWT = require('../helpers/jwt');
const RESULT = require('../common/auth_service_result');

module.exports = (req, res) => {
	const TOKEN = req.headers["token"];
	if(TOKEN){
		const DECODED = JWT.decode(TOKEN);
		if(DECODED){
			RESULT.result = true;
			console.log(DECODED);
		} else {
			RESULT.describe = 'wrong token';
		}
	} else {
		RESULT.describe = 'missing the token';
	}

	res.json(RESULT);
};
