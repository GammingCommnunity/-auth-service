const AUTH_SERVICE_RESPONSE = require("./auth_servive_response");
const FORMIDABLE = require("formidable");

module.exports = (req, res, urlMapper, responseHandler) => {
	const RESPONSE = new AUTH_SERVICE_RESPONSE();
	const URL = req.url.split("?")[0];
	const CONTROLLER = urlMapper.getController(req.method, URL);
	if (CONTROLLER) {
		FORMIDABLE.IncomingForm().parse(req, (error, fields, files) => {
			if (error) {
				RESPONSE.describe = error;
				responseHandler(res, RESPONSE);
			} else {
				responseHandler(
					res,
					CONTROLLER(RESPONSE, fields, files)
				);
			}
		});
	} else {
		RESPONSE.describe = "url not found";
		responseHandler(res, RESPONSE);
	}
};
