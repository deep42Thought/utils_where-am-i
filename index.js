'use strict';

/** 
 * @copyright Copyright (C) 1985..2021 Martin Baker -YDR. {@link https://yorkdevres.co.uk}
 * @author Martin W Baker
 * @license ISC Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 */

/**
 *  Provides a synchronous equivalent of nodeJS`require()` so that ES5+ Modules can still use require rather than have to be recorded to use dynamic `import().then()`
 * 
 *  Presently only supports nodeJS environment but later will include usable at client
 * 
 * Deliberately written in an archaic version of javascript to run in odd places like Wscript and classicASP as well as node and at browser
 * 
 * See Examples for the JSON objects returned.
 * 
 * @module @ydr/utils_where-am-i
 */

//========================#

function whereAmI() {
	var where = {
		"genre": "unknown",
		"version": null,
		"computerName": null,
		"os": null
	};

	var wshShell;

	if ((typeof process === "object") && (process.release && process.release.name === "node")) {
		where = {
			genre: "server",
			type: "node",
			version: process.version,
			os: process.platform.toLowerCase()
		};
	}

	/* jshint -W117*/
	else if (typeof Window === "function" && window.document) {
		var type;
		var version;

		try {
			for (var key in $.browser) {
				if (Object.hasOwnProperty.call($.browser, key)) {
					var element = $.browser[key];
					if (typeof element === "boolean" && key != "webkit") {
						type = key;
						version = $.browser.version;
						break;
					}
				}
			}
		} catch (err) {}

		if (!type) {
			type = (navigator.mozGetUserMedia) ?
				"Firefox" :
				window.Bing ?
				"Edg" :
				/Google/.test(navigator.vendor) ?
				"Chrome" :
				/Trident/.test(navigator.userAGent) ?
				"Trident" : navigator.vendor.split(/ /)[0];

			var items = window.navigator.userAgent.replace(/(\w+\/)/g, "\u400d$1").split(/\u400d/);

			for (var index = 0; index < items.length; index++) {
				var item = items[index];
				details = items.split(/[ \/]/);
				if (details[0] === type) {
					version = item.split(/[ \/]/)[1];
					return true;
				}
			}
		}

		where = {
			genre: "browser",
			os: window.navigator.platform.toLowerCase(),
			type: type || window.navigator.userAgent.toLowerCase(),
			version: version || "unknown"
		};
	} else if (typeof WScript === "object") {

		wshShell = new ActiveXObject("WScript.Shell");

		where = {
			genre: "script",
			os: "win" + wshShell.Environment("SYSTEM")("PROCESSOR_ARCHITECTURE").replace(/[a-z]+/i, ""),
			type: "WScript",
			version: WScript.Version
		};
	} else if (typeof Server === "object") {

		wshShell = new ActiveXObject("WScript.Shell");
		var serverSoftware = Request.ServerVariables("SERVER_SOFTWARE") + "";

		where = {
			genre: "server",
			os: "win" + wshShell.Environment("SYSTEM")("PROCESSOR_ARCHITECTURE").replace(/[a-z]+/i, ""),
			type: serverSoftware.split(/\//)[0].split(/-/)[1] + "/aspClassic",
			version: serverSoftware.split(/\//)[1]
		};
	}
	return where;
}
/* jshint +W117*/

//========================#
const exporter = whereAmI();
module.exports = exporter;