const RESPONSE_CLASS = require("./response").class;
const FORMIDABLE = require("formidable");

exports.getRequestListener = urlMapper => {
	return (req, res) => {
		const RESPONSE = new RESPONSE_CLASS(res);
		const URL = req.url.split("?")[0];
		const CONTROLLER = urlMapper.getController(req.method, URL);
		if (CONTROLLER) {
			FORMIDABLE.IncomingForm().parse(req, (error, fields, files) => {
				if (error) {
					RESPONSE.describe = error;
					RESPONSE.end();
				} else {
					CONTROLLER(RESPONSE, fields, files);
				}
			});
		} else {
			RESPONSE.describe = "url not found";
			RESPONSE.end();
		}
	};
};
