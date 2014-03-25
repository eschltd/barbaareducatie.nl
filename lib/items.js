var fs = require("fs")
var path = require("path")

var config = require("../config")

var baseDir = path.join(__dirname, "../", config.paths.items)

module.exports = items

function items(directory, filename) {
    if (!filename) {
        return require(path.join(baseDir, directory, "index.json"))
    } else {
        return fs.readFileSync(path.join(baseDir, directory, filename), "utf8")
    }
}
