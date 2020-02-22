module.exports = (res, error) => {
	if(error){
		res.describe = error.message;
		res.end();
		return false;
	} else {
		return true;
	}
}