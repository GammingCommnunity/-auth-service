const JSON_HELPER = require("./json_helper");
const RESPONSE_STATUS = require("../config/response_status");
const DEFAULT_RESPONSE_STATUS = {
	SUCCESSFUL: "SUCCESSFUL",
	FAILED: "FAILED"
};

module.exports = class {
	constructor(
		res,
		status = RESPONSE_STATUS.FAILED
			? RESPONSE_STATUS.FAILED
			: DEFAULT_RESPONSE_STATUS.FAILED,
		data = null,
		describe = ""
	) {
		this.res = res;
		this.status = status;
		this.data = data;
		this.describe = describe;
	}

	end(status = 200) {
		this.res.writeHead(status, { "Content-Type": "application/json" });
		this.res.write(
			JSON_HELPER.encode({
				status: this.status,
				data: this.data,
				describe: this.describe
			})
		);
		this.res.end();
	}

	getResponse() {
		return this.res;
	}

	forbiddenResponse() {
		this.res.writeHead(403);
		this.res.end();
	}
	notFoundResponse() {
		this.res.writeHead(404);
		this.res.end();
	}
	conflictResponse() {
		this.res.writeHead(419);
		this.res.end();
	}
};
