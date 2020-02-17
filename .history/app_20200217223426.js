const secretKey = '';
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 1995;

const HANDLER = (req, res) => {
	const dog = req.body.query;
	console.log(dog);
};

app.use(cors());
app.use(bodyParser.json());
app.post("*", HANDLER);
app.get("*", HANDLER);
server.listen(PORT);

