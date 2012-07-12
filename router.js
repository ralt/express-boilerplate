var routes = require("routes")
    , router = new routes.Router

router.addRoute("/", require("./routes/home"))

module.exports = router