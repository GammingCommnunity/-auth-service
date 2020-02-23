const FS = require("fs");
const LOCALE = require("../config/app").LOCALE;
const CONSOLE_COLOR = require("./consolelog_color");

const LOG_ERROR_HANDLE = notErrorCallback => {
	return error => {
		if (error) {
			CONSOLE_COLOR.red("Log writing error:");
			console.log(error);
		} else {
			notErrorCallback();
		}
	};
};

exports.writeRequest = (
	req,
	formData = {},
	files = {},
	error = null,
	displayOnConsole = false
) => {
	const DATE_NOW = new Date().toLocaleString(LOCALE ? LOCALE : "vi-VN");
	const CONTENT =
		JSON.stringify(
			{
				head: `[${DATE_NOW}] ${req.method} - ${req.url}`,
				body: {
					header: req.headers,
					form_data: formData,
					files: files,
					error: error
				}
			},
			null,
			4
		) + ",\n";

	FS.appendFile(
		".log",
		CONTENT,
		LOG_ERROR_HANDLE(() => {
			if (displayOnConsole) {
				//display a little bit of request info
				CONSOLE_COLOR.green(`[${DATE_NOW}] ${req.method} - ${req.url}`);
			}
		})
	);
};

exports.write = (text, displayOnConsole = false) => {
	if (text) {
		const DATE_NOW = new Date().toLocaleString(LOCALE ? LOCALE : "vi-VN");
		const CONTENT = `[${DATE_NOW}] message:\n${
			typeof text === "object" ? JSON.stringify(text, null, 4) : text
		}`;

		FS.appendFile(
			".log",
			CONTENT,
			LOG_ERROR_HANDLE(() => {
				if (displayOnConsole) {
					//display a little bit of request info
					CONSOLE_COLOR.green(`[${DATE_NOW}] message:`);
					console.log(text);
				}
			})
		);
	}
};
