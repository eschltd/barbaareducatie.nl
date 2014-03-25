var fs = require("fs")
var path = require("path")

var templateDir = require("../config.json").paths.templates

module.exports = template

function template(filename) {
    var filePath = path.join(__dirname, "../", templateDir, filename)
    return fs.readFileSync(filePath, "utf8")
}
