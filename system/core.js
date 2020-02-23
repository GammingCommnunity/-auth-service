const RESPONSE_CLASS = require("./response");
const FORMIDABLE = require("formidable");
const LOG = require("./log");

exports.getRequestListener = (
	urlMapper,
	requestCallback = null,
	responseCallback = null
) => {
	return (req, res) => {
		if (requestCallback) requestCallback(req, res);

		const RESPONSE = new RESPONSE_CLASS(res);
		const URL = req.url.split("?")[0];
		const METHOD = req.method.toUpperCase();
		const MAPPED_NODE = urlMapper.getANode(METHOD, URL);

		if (MAPPED_NODE) {
			FORMIDABLE.IncomingForm().parse(req, (error, fields, files) => {
				LOG.writeRequest(req, fields, files, error, true);

				if (error) {
					RESPONSE.describe = error;
					RESPONSE.end();
				} else {
					if (MAPPED_NODE.middleware) {
						MAPPED_NODE.middleware(
							data => {
								MAPPED_NODE.controller(
									req,
									RESPONSE,
									fields,
									files,
									data,
									responseCallback
								);
							},
							req,
							RESPONSE,
							fields,
							files
						);
					} else {
						MAPPED_NODE.controller(
							req,
							RESPONSE,
							fields,
							files,
							null,
							responseCallback
						);
					}
				}
			});
		} else {
			RESPONSE.describe = "url not found";
			RESPONSE.end();
			LOG.writeRequest(req, {}, {}, RESPONSE.describe, true);
		}
	};
};
