const secretKey = "";
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

const HANDLER = (req, res) => {
	const dog = req.body.query;
	console.log(dog);
	res.write("hello");
	res.end();
};

app.use(cors());
app.use(bodyParser.json());
app.post("*", HANDLER);
app.get("*", HANDLER);
server.listen(PORT);
