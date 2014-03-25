var render = require("string-template")
var ent = require("ent")
var attrEncode = require("attr-encode")

var template = require("template")

var newsTemplate = template("news-template.html")

module.exports = generateNews

function generateNews(news, siteVars) {
    news.sort(descending)
    return news.map(newsItem).map(extend.bind(null, siteVars))
}

function newsItem(item, index, arr) {
    return render(newsTemplate, {
        img: attrEncode(item.image),
        title: ent(item.title),
        body: ent(item.body)
    })
}

function descending(a, b) {
    return a.created < b.created
}
