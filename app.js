const SECRET_KEY = `L.AM1u"9AruBGs%bIqK@->DQK$|_{UA"Q^)Pq<dJUG[/m4A(86Lz!7D-in!,wB=kPsogiTp-- ida4b7btGd(F ::ze";WR3)o]yCY=bE?l L^KT,hH#zWb)rULnnnpTMV[qVhr)Vc?hY l[O0uQ.N7P-S&m,NrVM8Rt#Y}Bu?L68yOrgp?]w?E~>*d"a%|'oh:ALvXu2R[n"!82#2%;/4]-qSUwtz_oBDEO_.Eo8HKEcV{=qQ}N~awZ+,Nx@_!6`;
const GLOBAL_KEY = `Ra7uH5pDFPgOZA3JITmZda0Erd9FpUb94vq9QDnLH1fM2P79em5l2Hio1xv7r93x5xEZmV1ncVW3jFBHpTguHQA8M82A6B3FeE4v8fg2O1oBjqCe4EUbb9142EGlN3Ow0uT6R1PzO3WRDZ770w09A9X0Z87XPNv7coGn84rnnV8dHI36a32D3u98wrz1c174hc90452qNvcFsoleRP6jc8hU2J0a0025tbR8Q0Mxl08LQR0SG3kfU0h492T2p9gk0C88mZ3c17jqK62d5dP0w1tYP8Ip0I0cnjcJSLAUadj3Mpjh85Z2qT6zTv09878CE5zBy5yUehjRx5yhgr65FWh9DV0d0HtjSu86P85TuyMFb9nrci0mwDddTnB1cR9WFUI9TPlb8KrdcwOJP9M037Hsn0ASnHxAhl0HnW38494j09409Dr05vU76rltvSpPK753TdE2ffg5V2h3ke129jEcgXEKIy5e606wzFolUyB975aJ9Tgk7L2xsXeT9e72`;

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

const HANDLER = (req, res) => {
	const TOKEN = req.headers["token"];
	if (TOKEN) {
		console.log(TOKEN);
		res.write('Hello');
	}
	res.type("application/json");
	res.end();
};

app.use(cors());
app.use(bodyParser.json());
app.get("*", HANDLER);
server.listen(PORT);
