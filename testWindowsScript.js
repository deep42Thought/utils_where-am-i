'use strict';

// this will only work under Wscript or classicASP

/*jshint -W061 */
var fso = new ActiveXObject("Scripting.FileSystemObject");

function saveFile(strFullPath, strContent) {
	var file = fso.CreateTextFile(strFullPath, true);
	file.Write(strContent);
	file.Close();
	file = null;
}

var whereAmIFile = "./index.js";
var whereSource = fso.OpenTextFile(whereAmIFile).ReadAll();

eval(whereSource.split(/====#/)[1]);
var whereObj = whereAmI();
var result = [];

/* jshint -W089 */
for (var entry in whereObj) {
	result.push('"' + entry + '": "' + whereObj[entry] + '"');
}

saveFile("./textWindowsResult.json", "{" + result.join(",") + "}");