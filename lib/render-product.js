var htmlEncode = require("./escape")
var render = require("string-template")

var template = require("./template")
var markdown = require("./markdown")
var layoutData = require("./layout-data")

var productTemplate = template("product.html")
var linkTemplate = template("product-link.html")
var imageTemplate = template("product-image.html")

module.exports = renderProduct

function renderProduct(pageData) {
    return render(productTemplate, {
        onderwerp: htmlEncode(render(pageData.onderwerp, layoutData)),
        niveau: htmlEncode(render(pageData.niveau, layoutData)),
        werkvorm: htmlEncode(render(pageData.werkvorm, layoutData)),
        auteur: htmlEncode(render(pageData.auteur, layoutData)),
        body: pageData.markdown ?
            render(markdown(pageData.markdown), layoutData) :
            "",
        images: renderImages(pageData.images),
        link: renderLink(pageData.download)
    })
}

function renderImages(images) {
    if (Array.isArray(images)) {
        return images.map(src).map(renderImage).join(" ")
    }

    return ""
}

function renderImage(src) {
    return render(imageTemplate, src)
}

function src(imageSrc) {
    return {
        src: htmlEncode(render(imageSrc, layoutData))
    }
}

function renderLink(link) {
    if (link) {
        return render(linkTemplate, {
            href: htmlEncode(render(link.href, layoutData)),
            text: htmlEncode(render(link.text, layoutData))
        })
    } else {
        return ""
    }
}
