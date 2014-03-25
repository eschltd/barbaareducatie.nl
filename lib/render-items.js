var htmlEncode = require("ent").encode
var render = require("string-template")

var template = require("./template")
var items = require("./items")
var layoutData = require("./layout-data")

var itemTemplate = template("list-item.html")
var linkTemplate = template("item-link.html")

module.exports = generateList

function generateList(pageData) {
    var listIndex = items(pageData.directory)
    var listItems = listIndex.sort(descending)

    if ("order" in pageData) {
        var order = pageData.order

        if (order === "desc" || order === "descending") {
            listItems.sort(descending)
        } else if (order === "asc" || order === "ascending") {
            listItems.sort(ascending)
        }
    }

    if ("limit" in pageData) {
        listItems = listItems.slice(0, pageData.limit)
    }

    return listItems.map(listItem.bind(null, pageData.directory)).join("")
}

function listItem(directory, item) {
    return render(render(itemTemplate, {
        image: htmlEncode(item.image),
        title: htmlEncode(item.title),
        body: item.body ? items(directory, item.body) : "",
        footer: itemFooter(item.link)
    }), layoutData)
}

function itemFooter(item) {
    if (item) {
        return render(linkTemplate, {
            "text": htmlEncode(render(item.text, layoutData)),
            "href": htmlEncode(render(item.href, layoutData))
        })
    }

    return ""
}

function descending(a, b) {
    return a.created < b.created
}

function ascending(a, b) {
    return a.created > b.created
}
