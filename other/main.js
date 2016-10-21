var fs = require( 'fs' );
var path = require( 'path' );
var process = require( "process" );

var fromFile = "./locales";

// Loop through all the files in the temp directory
fs.readdir( fromFile, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        }

        var lang;
        var result = [];

        files.forEach( function( file, index ) {

                // Make one pass and make the file complete
                var fromPath = path.join( fromFile, file );

                var obj = JSON.parse(fs.readFileSync(fromPath + '/delimiters.json', 'utf8'));
                var locale = file.toString();

                lang = obj['main'][locale]['identity']['language'];
                if (result.indexOf(lang) === -1) {
                  result.push(lang);
                }
        } );
        return result;
} );
