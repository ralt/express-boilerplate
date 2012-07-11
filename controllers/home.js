module.exports = function( req, res ) {
    app.models.homeModel.getDatas( function( err, datas ) {
        res.render( 'home', datas );
    });
};

