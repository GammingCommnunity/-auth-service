module.exports = (res, fields, files) => {
	console.log(fields);
	res.data = fields;
	return res;
};
