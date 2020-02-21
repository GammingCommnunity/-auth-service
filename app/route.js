module.exports = app => {
	app.get("/auth", require("./functions/auth"));
	app.post("/login", require("./postns/login"));
	app.post("/register", require("./postctions/register"));
	app.get("/test", require("./functions/test"));
};
