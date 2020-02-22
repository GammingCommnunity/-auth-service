const HTTP = require("http");
const MONGOOSE = require("mongoose");
const ROUTE = require("./app/route");
const REQUEST_LISTENER = require("./system/core").getRequestListener(ROUTE());

MONGOOSE.connect(
	"mongodb+srv://root:Aa123456789Aa@cluster0-kw9wx.mongodb.net/test?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	error => {
		console.log(error);
	}
);

HTTP.createServer(REQUEST_LISTENER).listen(3000);
