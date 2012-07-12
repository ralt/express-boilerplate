var http = require("http")
    , port = process.env.PORT || 8080
    , router = require("./router")
    , routil = require("./routil")

var server = http.createServer(function (req, res) {
    var route = router.match(req.url)
    if (!route) {
        return routil.errorPage(req, res, 404)
    }

    route.fn(req, res, route.params, route.splats)
})

server.listen(port, function () {
    console.log('Listening on: ', server.address().port)
})