var test = require("tape")

var barbaareducatieNl = require("../index")

test("barbaareducatieNl is a function", function (assert) {
    assert.equal(typeof barbaareducatieNl, "function")
    assert.end()
})
