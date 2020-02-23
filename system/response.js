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
		const CACHE = [];
		this.res.writeHead(status, { "Content-Type": "application/json" });
		this.res.write(
			JSON.stringify(
				{
					status: this.status,
					data: this.data,
					describe: this.describe
				},
				(key, value) => {
					if (value === undefined) {
						return null;
					} else if (typeof value === "object") {
						if (CACHE.indexOf(value) !== -1) {
							// Duplicate reference found, discard key
							return;
						}
						// Store value in our collection
						CACHE.push(value);
					}
					return value;
				}
			)
		);
		this.res.end();
	}

	getResponse() {
		return this.res;
	}
};
