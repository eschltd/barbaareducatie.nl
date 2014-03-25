var extend = require("xtend")
var path = require("path")
var content = require("./content")

var baseURI = require("../config.json").baseURI

module.exports = content.map(function (item) {
    var vars = {}
    var id = item.id

    if (id) {
        if ("title" in item) {
            vars[id+"Title"] = item.title
        }
        if ("output" in item) {
            vars[id+"Link"] = path.join(baseURI, item.output)
        }
    }

    return vars
}).reduce(extend, {})
