var extend = require("xtend")

var headerData = require("./header-data")
var contentData = require("./content-data")

module.exports = extend(headerData, contentData)
