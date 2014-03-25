var fs = require("fs")
var path = require("path")

var config = require("../config")

var newsDir = path.join(__dirname, "../", config.paths.news)
var newsIndex = require(path.join(newsDir, "index.json"))

module.exports = news

function news(filename) {
    if (!filename) {
        return newsIndex
    } else {
        return fs.readFileSync(path.join(newsDir, filename), "utf8")
    }
}
