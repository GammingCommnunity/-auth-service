const JWT = require('../helpers/jwt');

module.exports = (res, fields, files) => {
	const TOKEN = req.headers["token"];
	if(TOKEN){
		const DECODED = JWT.decode(TOKEN);
		if(DECODED){
			res.result = true;
			console.log(DECODED);
		} else {
			res.describe = 'wrong token';
		}
	} else {
		res.describe = 'missing the token';
	}

	return res;
};
