const HTTP = require("http");
const REQUEST_HANDLER = require("./system/request_handler");
const RESPONSE_HANDLER = require("./system/response_handler");
const ROUTE = require('./app/route');
const CORE = require("./system/core");
const REQUEST_LISTENER = CORE.getRequestListener(
	REQUEST_HANDLER,
	RESPONSE_HANDLER,
	ROUTE()
);

HTTP.createServer(REQUEST_LISTENER).listen(3000);
