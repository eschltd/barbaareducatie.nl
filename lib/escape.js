var quot = /\"/g
var lt = /</g
var gt = />/g

module.exports = escape

function escape(str) {
    return str.replace(quot, "&quot;").replace(lt, "&lt;").replace(gt, "&gt;")
}