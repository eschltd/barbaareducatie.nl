var htmlEncode = require("ent").encode
var render = require("string-template")

var contentData = require("./content-data")
var template = require("./template")

var liTemplate = template("list-link.html")
var separator = template("list-separator.html")

module.exports = generateLinks

function generateLinks(links) {
    return links.map(link).join(separator)
}

function link(item) {
    return render(liTemplate, {
        text: htmlEncode(render(item.text, contentData)),
        href: htmlEncode(render(item.href, contentData))
    })
}
