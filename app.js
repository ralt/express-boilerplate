var path = require( 'path' ),
    express = require( 'express' ),
    port = process.env.PORT || 8080,
    loader = require( './loader.js' );

// Make `app` a global variable
global.app = module.exports = express.createServer(),

/**
 * Configuration
 */
app.configure( function() {
  // Defines the view folder and engine used.
  this.set( 'views', path.join( __dirname, 'views' ) );
  this.set( 'view engine', 'ejs' );

  // Allow parsing form data
  this.use( express.bodyParser() );

  // Allow parsing cookies from request headers
  this.use( express.cookieParser() );
  this.use( express.session( {
    // Private crypting key
    secret: 'keyboard cat',
    cookie: {
      maxAge: 1800000
    }
  }));
});

app.configure( 'development', function() {
  this.use( express.errorHandler( {
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure( 'production', function() {
  this.use( express.errorHandler() );
});

/**
 * Load the loader
 */
loader.load();

/**
 * Start server
 */
if ( !module.parent ) {
    app.listen( port, function() {
        console.log( 'Listening on: ' + JSON.stringify( app.address() ) );
    });
}

