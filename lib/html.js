var fs = require("fs")
var path = require("path")
var render = require("string-template")

var layoutData = require("./layout-data")

var htmlpath = require("../config.json").paths.html

module.exports = markdownFile

function markdownFile(filename) {
    var uri = path.join(__dirname, "../", htmlpath, filename)
    var pageContent = fs.readFileSync(uri, "utf8")
    return render(pageContent, layoutData)
}
