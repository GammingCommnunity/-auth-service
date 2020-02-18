const EXPRESS = require("express");
const APP = EXPRESS();
const SERVER = require("http").createServer(APP);
const BODY_PARSER = require("body-parser");
const CORS = require("cors");
const ROUTE = require("./app/route");
const PORT = 3000;

APP.use(CORS());
APP.use(BODY_PARSER.json());
SERVER.listen(PORT);
ROUTE(APP);
