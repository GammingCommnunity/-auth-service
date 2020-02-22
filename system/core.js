module.exports = {
	getRequestListener(requestHandler, responseHandler, urlMapper) {
		return (req, res) => {
			requestHandler(req, res, urlMapper, responseHandler);
		};
	}
};
