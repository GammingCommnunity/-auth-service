const RESPONSE_CLASS = require("./response").class;
const FORMIDABLE = require("formidable");

exports.getRequestListener = urlMapper => {
	return (req, res) => {
		const RESPONSE = new RESPONSE_CLASS(res);
		const URL = req.url.split("?")[0];
		const METHOD = req.method.toUpperCase();
		const MAPPED_NODE = urlMapper.getANode(METHOD, URL);

		if (MAPPED_NODE) {
			FORMIDABLE.IncomingForm().parse(req, (error, fields, files) => {
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
									data
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
							null
						);
					}
				}
			});
		} else {
			RESPONSE.describe = "url not found";
			RESPONSE.end();
		}
	};
};
