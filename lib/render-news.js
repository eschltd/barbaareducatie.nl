var htmlEncode = require("ent").encode
var render = require("string-template")

var template = require("./template")
var news = require("./news")

var itemTemplate = template("news-item.html")
var linkTemplate = template("news-link.html")

var newsIndex = news()


module.exports = generateNews

function generateNews(maxItems) {
    var newsItems = newsIndex.sort(descending).slice(0, maxItems)
    return newsItems.map(newsItem).join("")
}

function newsItem(item) {
    return render(itemTemplate, {
        image: htmlEncode(item.image),
        title: htmlEncode(item.title),
        body: item.body ? news(item.body) : "",
        footer: newsFooter(item.link)
    })
}

function newsFooter(item) {
    if (item) {
        return render(linkTemplate, {
            "text": htmlEncode(item.text),
            "href": htmlEncode(item.href)
        })
    }

    return ""
}

function descending(a, b) {
    return a.created < b.created
}
