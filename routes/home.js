var routil = require("routil")

module.exports = function (req, res) {
    routil.template(req, res, 'home.mustache', {
        text: 'foo'
        , title: 'bar'
    })
}