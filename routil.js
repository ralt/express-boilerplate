var routil = require("routil")
    , hoganize = require("templar-hogan").routil
    , path = require("path")

hoganize(routil, path.join(__dirname, "templates"))

module.exports = routil