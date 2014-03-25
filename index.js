var console = require("console")
var extend = require("xtend")
var fs = require("fs")
var minify = require("html-minifier").minify
var mkdirp = require("mkdirp")
var ncp = require("ncp")
var path = require("path")
var render = require("string-template")
var rmdir = require("rmdir")

var layoutData = require("./lib/layout-data")
var pageData = require("./lib/page-data")
var template = require("./lib/template")
var content = require("./lib/content")

var config = require("./config.json")

var layout = template("layout.html")
var outDir = path.join(__dirname, config.paths.output)

fs.exists(outDir, function (exists) {
    if (exists) {
        rmdir(outDir, makeOutput)
    } else {
        makeOutput()
    }
})

function makeOutput(err) {
    if (err) {
        return console.log(err)
    }

    mkdirp(outDir, generateSite)
}

function generateSite(err) {
    if (err) {
        return console.log(err)
    }

    // Generate the pages
    content.forEach(function (page) {
        var html = render(layout, extend(layoutData, pageData[page.type](page)))
        fs.writeFile(path.join(outDir, page.output), minify(html, {
            removeComments: true,
            collapseWhitespace: true
        }))
    })

    // Copy the site resources to the output directory
    ncp(config.paths.resources, outDir)
}
