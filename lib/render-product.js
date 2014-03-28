var htmlEncode = require("./escape")
var render = require("string-template")

var template = require("./template")
var markdown = require("./markdown")
var layoutData = require("./layout-data")

var productTemplate = template("product.html")
var linkTemplate = template("product-link.html")
var imageTemplate = template("product-image.html")
var thumbTemplate = template("product-thumb.html")

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
    if (src.src) {
        return render(imageTemplate, src)
    } else if (src.thumb && src.image) {
        return render(thumbTemplate, src)
    }

    throw new Error("Unknown image type")
}

function src(imageSrc) {
    if (typeof imageSrc === "string") {
        return {
            src: htmlEncode(render(imageSrc, layoutData))
        }
    } else if (imageSrc.thumb && imageSrc.image) {
        return {
            image: htmlEncode(render(imageSrc.image, layoutData)),
            thumb: htmlEncode(render(imageSrc.thumb, layoutData))
        }
    }

    throw new Error("Unknown image type")
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
