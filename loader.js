/**
 * This file loads the models, controllers, validators
 * and helpers onto the app object.
 */

var fs = require( 'fs' ),
    path = require( 'path' );

module.exports = {
    load: load
};

/**
 * Folders to load
 */
var loads = [
    'models',
    'controllers',
    'validators',
    'helpers',
    'routes'
];

/**
 * Really handy function
 * Any string will be able to use:
 *   "string".capitalize() // "String"
 */
String.prototype.capitalize = function() {
    return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
}

function load() {
    loads.forEach( function( folder ) {
        app[ folder ] = loadFiles( folder, app );

        console.log( 'Loaded: ' + folder + ' in app' );
    });
}

/**
 * Load the files of a folder and adds an object for
 * each file in a "folder" object.
 *
 * This allows us to use `app.models.homeModel.getDatas()`
 * or `app.controllers.homeController`.
 */
function loadFiles( folder, app ) {
    var folderObj = {},
        files = fs.readdirSync( path.join( __dirname, folder ) );

    files.forEach( function( file ) {
        // Skip if it's a hidden file (starting with a dot)
        if ( file.substr( 0, 1 ) === '.' ) {
            return;
        }

        // Strips off the .js at the end
        var fileObj = file.replace( /\.js$/, '' ),
        // Create the object name
            objName = fileObj + folder.capitalize().slice( 0, -1 );

        folderObj[ objName ] = require(
            path.join( __dirname, folder, file )
        );

        console.log( 'Loaded: ' + objName + ' in ' + folder );
    });

    return folderObj;
}

