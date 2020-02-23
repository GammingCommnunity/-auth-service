const FS = require("fs");
const LOCALE = require("../config/app").LOCALE;
const WRITE_LOG = require("../config/app").WRITE_LOG;
const CONSOLE_COLOR = require("./consolelog_color");

const LOG_ERROR_HANDLE = notErrorCallback => {
	return error => {
		if (error) {
			CONSOLE_COLOR.red("Log writing error:\n");
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
	if (WRITE_LOG === undefined || WRITE_LOG) {
		const DATE_NOW = new Date().toLocaleString(LOCALE ? LOCALE : "vi-VN");
		const DATA = {
			header: req.headers,
			form_data: formData,
			files: files,
			error: error
		};
		const CONTENT =
			`[${DATE_NOW}] ${req.method} - ${req.url}` +
			`\n${JSON.stringify(DATA, null, 4)}\n\n\n`;

		FS.appendFile(
			"log.txt",
			CONTENT,
			LOG_ERROR_HANDLE(() => {
				if (displayOnConsole) {
					//display a little bit of request info
					CONSOLE_COLOR.green(
						`[${DATE_NOW}] ${req.method} - ${req.url}`
					);
				}
			})
		);
	}
};

exports.write = (text, displayOnConsole = false) => {
	if (text) {
		const DATE_NOW = new Date().toLocaleString(LOCALE ? LOCALE : "vi-VN");
		const CONTENT = `[${DATE_NOW}] message:\n${text}`;

		FS.appendFile(
			"log.txt",
			CONTENT,
			LOG_ERROR_HANDLE(() => {
				if (displayOnConsole) {
					//display a little bit of request info
					CONSOLE_COLOR.green(`[${DATE_NOW}] message:\n`);
					console.log(text);
				}
			})
		);
	}
};
