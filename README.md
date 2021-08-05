# YDR Utilities - @ydr/require

## Introduction

Disclose where your code is running

A javascript tool that investigates and reports on the environment in which it is running.  Presently coded for browsers and various windows environments but will report "unknown" for *.NET*.

There are no dependencies.

## Install

```command
npm install "@ydr/utils_where-am-i"
```

## Use

```javascript
import { genre, os, type, version } from "@ydr/utils_where-am-i/index.js";

or

const  { genre, os, type, version } = require ("@ydr/utils_where-am-i");
```

See the examples for the earliest versions of supported environments.

If not running under nodeJS ensure the script engine can import the script file from an accessible location.

Otherwise use `<script />` or httpRequest or filesystem to load the file *./index.js*.

If your environment does not not support either *require* or *import* then use the following as an example (where WScript or ASPclassic is in use) to get the result in a windows environment.

```json
var fso = new ActiveXObject("Scripting.FileSystemObject");
var whereAmIFile = "./index.js";
var whereSource = fso.OpenTextFile(whereAmIFile).ReadAll();
eval(whereSource.split(/====#/)[1]);
var whereObj = whereAmI();
```
