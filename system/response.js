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

	end() {
		let cache = [];
		this.res.writeHead(200, { "Content-Type": "application/json" });
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
						if (cache.indexOf(value) !== -1) {
							// Duplicate reference found, discard key
							return;
						}
						// Store value in our collection
						cache.push(value);
					}
					return value;
				}
			)
		);
		this.res.end();
	}
}

exports.class = Response;
exports.status = ResponseStatus;
