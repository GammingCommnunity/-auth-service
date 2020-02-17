const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 3000;
const server = require("http").createServer(app);

const HANDLER = (req, res) => {
	const dog = req.body.query;
	console.log(dog);
};

app.use(cors());
app.use(bodyParser.json());
server.listen(PORT);
app.post("*", HANDLER);

