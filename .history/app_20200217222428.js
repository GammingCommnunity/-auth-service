const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());
const server = require("http").createServer(app);

server.listen(PORT);
app.post("*", HANDLER);

const HANDLER = function(req, res) {
	const dog = req.body.query;
	console.log(dog);
};
