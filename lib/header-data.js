var renderLinks = require("./render-links")

var config = require("../config.json")

module.exports = {
    primaryLinks: renderLinks(config.primaryLinks),
    secondaryLinks: renderLinks(config.secondaryLinks)
}
