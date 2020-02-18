const JWT = require("jsonwebtoken");
const SECRET_KEY = `L.AM1u"9AruBGs%bIqK@->DQK$|_{UA"Q^)Pq<dJUG[/m4A(86Lz!7D-in!,wB=kPsogiTp-- ida4b7btGd(F ::ze";WR3)o]yCY=bE?l L^KT,hH#zWb)rULnnnpTMV[qVhr)Vc?hY l[O0uQ.N7P-S&m,NrVM8Rt#Y}Bu?L68yOrgp?]w?E~>*d"a%|'oh:ALvXu2R[n"!82#2%;/4]-qSUwtz_oBDEO_.Eo8HKEcV{=qQ}N~awZ+,Nx@_!6`;

exports.jwtEncode = (sessionCode, accountId, role) => {
	return JWT.sign({ ss: sessionCode, id: accountId, ro: role }, SECRET_KEY, {
		algorithm: "HS512",
		noTimestamp: true
	});
};

exports.jwtDecode = token => {
	let decoded = null;
	try {
		decoded = JWT.verify(token, SECRET_KEY);
	} catch (error) {}
	return decoded;
};
