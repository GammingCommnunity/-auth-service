const ResponseStatus = {
	SUCCESSFUL: "SUCCESSFUL",
	FAILED: "FAILED"
};
class AuthServiceResponse {
	constructor(status = ResponseStatus.FAILED, data = null, describe = "") {
		this.status = status;
		this.data = data;
		this.describe = describe;
	}
}

exports.class = AuthServiceResponse;
exports.status = ResponseStatus;
