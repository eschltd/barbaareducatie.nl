// Given the page data, return the template data
var htmlEncode = require("ent").encode

var markdown = require("./markdown")
var items = require("./render-items")

module.exports = {
    list: list,
    basic: basicPage
}

function list(pageData) {
    return {
        "title": htmlEncode(pageData.title),
        "content": items(pageData)
    }
}

function basicPage(pageData) {
    return {
        "title": htmlEncode(pageData.title),
        "content": markdown(pageData.markdown)
    }
}
