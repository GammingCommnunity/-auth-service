module.exports = (res, successCallback) => {
	return (error, docs) => {
		if (error) {
			res.describe = error.message;
			res.end();
		} else {
			successCallback(docs);
		}
	};
};
