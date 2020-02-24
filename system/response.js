const JSON_HELPER = require("./json_helper");
const RESPONSE_STATUS = require("../config/response_status");
const CRYPTO = require("crypto");
const DEBUG_MODE = require("../config/app").DEBUG;
const DEFAULT_RESPONSE_STATUS = {
	SUCCESSFUL: "SUCCESSFUL",
	FAILED: "FAILED"
};

module.exports = class {
	constructor(res) {
		this.res = res;
	}

	end(
		status = RESPONSE_STATUS.FAILED
			? RESPONSE_STATUS.FAILED
			: DEFAULT_RESPONSE_STATUS.FAILED,
		data = null,
		describe = "",
		responseStatus = 200
	) {
		const IS_DEBUG_MODE = DEBUG_MODE === undefined || DEBUG_MODE;
		this.res.writeHead(responseStatus, {
			"Content-Type": "application/json"
		});
		this.res.write(
			JSON_HELPER.encode({
				status: status,
				data: data,
				describe: IS_DEBUG_MODE
					? describe
					: CRYPTO.createHash("sha256")
							.update(describe)
							.digest("hex")
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
