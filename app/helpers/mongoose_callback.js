exports.callback = (res, callback) => {
	return (error, docs) => {
		if (error) {
			res.describe = error.message;
			res.end();
		} else {
			callback(docs);
		}
	};
};

exports.successCallback = (res, message, callback, notFoundCallback = null) => {
	return (error, docs) => {
		if (error) {
			res.describe = error.message;
			res.end();
		} else {
			if (
				docs &&
				(!("length" in docs) || ("length" in docs && docs.length > 0))
			) {
				if (callback) {
					callback(docs);
				}
			} else {
				if (notFoundCallback) {
					notFoundCallback();
				} else {
					res.describe = message;
					res.end();
				}
			}
		}
	};
};
