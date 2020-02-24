const MONGOOSE = require("mongoose");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;

const ACCOUNT = MONGOOSE.model(
	"Accounts",
	MONGOOSE.Schema({
		_id: Number,
		username: String,
		pwd: String,
		role: Number
	})
);

const CREATE = (res, username, pwd, id, role, successCallback) => {
	if (username && pwd && id && role) {
		ACCOUNT.findById(
			id,
			SUCCESS_CALLBACK(
				res,
				"",
				() => {
					res.describe = "Duplicate id.";
					res.end();
				},
				() => {
					ACCOUNT.find(
						{ username: username },
						SUCCESS_CALLBACK(
							res,
							"",
							() => {
								res.describe = "Duplicate username.";
								res.end();
							},
							() => {
								ACCOUNT.create(
									{
										_id: id,
										username: username,
										pwd: pwd,
										role: role
									},
									SUCCESS_CALLBACK(
										res,
										"Failed to create new account.",
										account => successCallback(account)
									)
								);
							}
						)
					);
				}
			)
		);
	} else {
		res.describe = "Missing some account info.";
		res.end();
	}
};

exports.model = ACCOUNT;
exports.create = CREATE;
