const RESPONSE_CLASS = require("./response").class;
const FORMIDABLE = require("formidable");

exports.getRequestListener = urlMapper => {
	return (req, res) => {
		const RESPONSE = new RESPONSE_CLASS(res);
		const URL = req.url.split("?")[0];
		const METHOD = req.method.toUpperCase();
		const CONTROLLER = urlMapper.getController(METHOD, URL);

		if (CONTROLLER) {
			FORMIDABLE.IncomingForm().parse(req, (error, fields, files) => {
				if (error) {
					RESPONSE.describe = error;
					RESPONSE.end();
				} else {
					CONTROLLER(req, RESPONSE, fields, files);
				}
			});
		} else {
			RESPONSE.describe = "url not found";
			RESPONSE.end();
		}
	};
};
