const secretKey = `me4=8 uKKqvh8q\Rz9X+BjDaROnwkrRh|F2qmbPYb_#'CiB9P hOzuK#AQjh1|_W>-jp_ic7g~Hafb>g,TGj*"m&y/P<wgHd~KB5}PYe<PfzLi<^3"[[UtM;?cvP9G? Vcb:@)h[z'NX;qY0qq(t,k/*|&t9Y(Lt1fDh&!=*8~_sEt M*e]G>IsiTW=93O!r4YFSMo)pS}\,,:c(%G/rJ$UgrZ4Mc$uh}l_kML 9[ks?kf\:s43j?-G0#]'q[Z-N'r.?YwZXGt6]/6z+|yYOo+HoDOgnj-] ]D7wX=_zXYBJui laTta!]^{J=y*/jm:65~j~"Q^9]u5g}xZNz-67z~ d:M:CTjmk(3_i4l_"6GBgI4KD>Z4]V#;6~%cS6:dq'H_i8p9-L3 S[7;&"u$xV05$wIi/)+j{bO' T',M@&0C#fYfi\Q@6j;v3Zqm&*#AG$p,V:Q@iVWP p!0o#ELXJev4hlxn=G6"mz}uM/N*1U_3ivAXa}"dVh|>yvlLWQ`;

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
