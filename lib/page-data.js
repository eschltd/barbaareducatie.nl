// Given the page data, return the template data
var htmlEncode = require("ent").encode

var markdown = require("./markdown")
var news = require("./render-news")

module.exports = {
    homepage: homepage,
    basic: basicPage
}

function homepage(pageData) {
    return {
        "title": htmlEncode(pageData.title),
        "content": news(pageData.newsItems)
    }
}

function basicPage(pageData) {
    return {
        "title": htmlEncode(pageData.title),
        "content": markdown(pageData.markdown)
    }
}
