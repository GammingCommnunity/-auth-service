const HELPER = require('./../helper');

module.exports = (req, res) => {
	res.type("application/json");
	const TOKEN = req.headers["token"];
	// if (TOKEN) {
	// 	console.log(TOKEN);
	// 	res.write("Hello");
	// }
	let token = HELPER.jwtDecode('eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzcyI6InNlc3Npb25feHl6IiwiaWQiOjE4LCJybyI6MX0.ARappXqSVaaWYDBIZbwRHacRvoXpJ4JXvpYFA0azvw9bCTeh3MpYbyC1Fs20pKcNOn1JyPPVWKh1TQG7ddM47fQ');
	// let token = HELPER.jwtEncode('session_xyz', 18, 1);
	res.write(JSON.stringify(token));
	res.end();
};
