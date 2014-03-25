var config = require("../config.json")

var content = [config.homepage]
content.push.apply(content, config.content)

module.exports = content
