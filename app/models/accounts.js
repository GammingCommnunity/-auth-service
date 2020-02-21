const MONGOOSE = require('mongoose');

module.exports = MONGOOSE.model('Accounts', MONGOOSE.Schema({
	id: Number,
	username: String,
	pwd: String,
	role: Number
}));