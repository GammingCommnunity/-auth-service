const MONGOOSE = require("mongoose");

module.exports = MONGOOSE.model(
	"LoginSessions",
	MONGOOSE.Schema({
		session_code: String,
		created_at: Date.now
	})
);
