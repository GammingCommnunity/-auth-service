const AUTH = require("./functions/auth");
const TEST = require("./functions/test");

module.exports = app => {
	app.get("/auth", AUTH);
	app.get("/test", TEST);
};
