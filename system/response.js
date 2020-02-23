const ResponseStatus = {
	SUCCESSFUL: "SUCCESSFUL",
	FAILED: "FAILED"
};
class Response {
	constructor(
		res,
		status = ResponseStatus.FAILED,
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
}

exports.class = Response;
exports.status = ResponseStatus;
