const MONGOOSE = require("mongoose");
const RESPONSE_STATUS = require("../../config/response_status");
const SUCCESS_CALLBACK = require("../helpers/mongoose_callback")
	.successCallback;

const SCHEMA = MONGOOSE.Schema({
	_id: Number,
	username: String,
	pwd: String,
	role: Number,
	status: Number
});
const ACCOUNT = MONGOOSE.model("Accounts", SCHEMA);

const CREATE = (res, username, pwd, id, role, status, successCallback) => {
	if (username && pwd && id && role && status) {
		ACCOUNT.findById(
			id,
			SUCCESS_CALLBACK(
				res,
				"",
				() => res.end(RESPONSE_STATUS.FAILED, null, "Duplicate id."),
				() => {
					ACCOUNT.find(
						{ username: username },
						SUCCESS_CALLBACK(
							res,
							"",
							() =>
								res.end(
									RESPONSE_STATUS.FAILED,
									null,
									"Duplicate username."
								),
							() => {
								ACCOUNT.create(
									{
										_id: id,
										username: username,
										pwd: pwd,
										role: role,
										status: status
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
		res.end(RESPONSE_STATUS.FAILED, null, "Missing some account info.");
	}
};

exports.schema = SCHEMA;
exports.model = ACCOUNT;
exports.create = CREATE;
