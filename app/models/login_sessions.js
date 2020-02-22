const MONGOOSE = require("mongoose");

module.exports = MONGOOSE.model(
	"LoginSessions",
	MONGOOSE.Schema({
		created_at: { type: Date, default: Date.now }
	})
);
