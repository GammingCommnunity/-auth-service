 class UrlMapper {
	constructor() {
		this.data = {
			GET: [],
			HEAD: [],
			POST: [],
			PUT: [],
			DELETE: [],
			CONNECT: [],
			OPTIONS: [],
			TRACE: [],
			PATCH: []
		};
	}

	map(method, url, controller) {
		this.data[method.toUpperCase()].push({
			url: url,
			controller: controller
		});
	}

	getController(method, url) {
		const ELEMENT = this.data[method.toUpperCase()].find(
			element => element.url === url
		);
		return ELEMENT ? ELEMENT.controller : null;
	}
};

module.exports = UrlMapper;
