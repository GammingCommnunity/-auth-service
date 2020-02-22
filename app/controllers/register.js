const ACCOUNT = require("../models/accounts");
const RESPONSE_STATUS = require("../../system/response").status;

module.exports = (res, fields, files) => {
	const USERNAME = fields.username;
	const PWD = fields.pwd;
	const ID = fields.id;
	const ROLE = fields.role;
	if (USERNAME && PWD && ID && ROLE) {
		ACCOUNT.findById(ID).exec((error, doc) => {
			if (error) {
				res.describe = error.message;
				res.end();
			} else {
				if (doc) {
					res.data = doc;
					res.describe = "ID";
					res.end();
				} else {
					ACCOUNT.find({ username: USERNAME }, (error, doc) => {
						if (error) {
							res.describe = error.message;
							res.end();
						} else {
							if (doc.length) {
								res.data = doc;
								res.describe = "USERNAME";
								res.end();
							} else {
								ACCOUNT.create(
									{
										_id: ID,
										username: USERNAME,
										pwd: PWD,
										role: ROLE
									},
									(error, doc) => {
										if (error) {
											res.describe = error.message;
											res.end();
										} else {
											res.status =
												RESPONSE_STATUS.SUCCESSFUL;
											res.data = doc;
											res.end();
										}
									}
								);
							}
							0;
						}
					});
				}
			}
		});
	} else {
		res.describe = "missing some account info";
		res.end();
	}
};
