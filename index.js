const DB_CONNECTION_STRING = require("./config/app").DB_CONNECTION_STRING;
const HTTP = require("http");
const MONGOOSE = require("mongoose");
const ROUTE = require("./app/route");
const REQUEST_LISTENER = require("./system/core").getRequestListener(ROUTE());

MONGOOSE.connect(
	DB_CONNECTION_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	error => {
		if (error) console.log(error);
	}
);

HTTP.createServer(REQUEST_LISTENER).listen(3000);
