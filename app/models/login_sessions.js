const MONGOOSE = require("mongoose");
const ACCOUNTS = require("./accounts");

const SCHEMA = MONGOOSE.Schema({
	account: ACCOUNTS.schema,
	is_active: { type: Boolean, default: true },
	created_at: { type: Date, default: Date.now }
});
const LOGIN_SESSION = MONGOOSE.model("LoginSessions", SCHEMA);

exports.schema = SCHEMA;
exports.model = LOGIN_SESSION;
