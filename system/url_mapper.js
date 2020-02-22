const METHODS = [
	"GET",
	"HEAD",
	"POST",
	"PUT",
	"DELETE",
	"CONNECT",
	"OPTIONS",
	"TRACE",
	"PATCH"
];
class UrlMapper {
	constructor() {
		this.data = [];
		METHODS.forEach(methodName => {
			this.data[methodName] = [];
		});
	}

	map(method, url, controller) {
		const METHOD = method.toUpperCase();
		if (METHOD === "ALL") {
			METHODS.forEach(methodName => {
				this.data[methodName].push({
					url: url,
					controller: controller
				});
			});
		} else {
			this.data[METHOD].push({
				url: url,
				controller: controller
			});
		}
	}

	getController(method, url) {
		const ELEMENT = this.data[method.toUpperCase()].find(
			element => element.url === url
		);
		return ELEMENT ? ELEMENT.controller : null;
	}
}

module.exports = UrlMapper;
