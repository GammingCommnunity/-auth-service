const MONGOOSE = require("mongoose");

const LOGIN_SESSION = MONGOOSE.model(
	"LoginSessions",
	MONGOOSE.Schema({
		account_id: Number,
		is_active: { type: Boolean, default: true },
		created_at: { type: Date, default: Date.now }
	})
);

exports.model = LOGIN_SESSION;
