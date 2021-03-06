var fs = require("fs")
var path = require("path")
var marked = require("marked")
var render = require("string-template")

var layoutData = require("./layout-data")

var mdpath = require("../config.json").paths.markdown

module.exports = markdownFile

function markdownFile(filename) {
    var uri = path.join(__dirname, "../", mdpath, filename)
    var pageContent = fs.readFileSync(uri, "utf8")
    return marked(render(pageContent, layoutData))
}
