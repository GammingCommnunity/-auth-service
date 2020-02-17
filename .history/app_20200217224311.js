const SECRET_KEY = `L.AM1u"9AruBGs%bIqK@->DQK$|_{UA"Q^)Pq<dJUG[/m4A(86Lz!7D-in!,wB=kPsogiTp-- ida4b7btGd(F ::ze";WR3)o]yCY=bE?l L^KT,hH#zWb)rULnnnpTMV[qVhr)Vc?hY l[O0uQ.N7P-S&m,NrVM8Rt#Y}Bu?L68yOrgp?]w?E~>*d"a%|'oh:ALvXu2R[n"!82#2%;/4]-qSUwtz_oBDEO_.Eo8HKEcV{=qQ}N~awZ+,Nx@_!6`;

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

const HANDLER = (req, res) => {
	const dog = req.body.query;
	console.log(dog);
	res.write(req.headers);
	res.end();
};

app.use(cors());
app.use(bodyParser.json());
app.post("*", HANDLER);
app.get("*", HANDLER);
server.listen(PORT);
