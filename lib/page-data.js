// Given the page data, return the template data
var htmlEncode = require("ent").encode
var render = require("string-template")

var layoutData = require("./layout-data")

var html = require("./html")
var markdown = require("./markdown")
var items = require("./render-items")
var renderProduct = require("./render-product")



module.exports = {
    list: list,
    product: product,
    html: htmlPage,
    basic: basicPage
}

function list(pageData) {
    return {
        "title": htmlEncode(render(pageData.title, layoutData)),
        "content": items(pageData)
    }
}

function product(pageData) {
    return {
        "title": htmlEncode(render(pageData.title, layoutData)),
        "content": renderProduct(pageData)
    }
}

function htmlPage(pageData) {
    return {
        "title": htmlEncode(render(pageData.title, layoutData)),
        "content": html(pageData.html)
    }
}

function basicPage(pageData) {
    return {
        "title": htmlEncode(render(pageData.title, layoutData)),
        "content": markdown(pageData.markdown),
    }
}
