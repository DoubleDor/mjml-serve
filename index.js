#! /usr/bin/env node

/* index.js -- main script file for mjml-server
 *
 * Copyright (C) 2016 Dor Technologies
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

var fs = require( 'fs' ),
    path = require( 'path' );

var express = require( 'express' ),
    mjml = require( 'mjml' ),
    Handlebars = require( 'handlebars' );

var app = express();

var base_dir = process.cwd();
var data_file = null;

if( process.argv.length >= 3 ) {
    if( path.isAbsolute( process.argv[ 2 ] ) ) {
        base_dir = process.argv[ 2 ];
    } else {
        base_dir = path.join( process.cwd(), process.argv[ 2 ] );
    }
}

if( process.argv.length >= 4 ) {
    if( path.isAbsolute( process.argv[ 2 ] ) ) {
        data_file = process.argv[ 3 ];
    } else {
        data_file = path.join( process.cwd(), process.argv[ 3 ] );
    }
}

Handlebars.registerHelper( "math", function( lvalue, operator, rvalue, options ) {
    lvalue = parseFloat( lvalue );
    rvalue = parseFloat( rvalue );
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[ operator ];
});

app.get( '/:filename', function( req, res ) {
    var mjml_file = fs.readFileSync( path.resolve( base_dir, req.params.filename ) ).toString();

    // Handlebars!
    if( data_file ) {
        var data_raw = fs.readFileSync( data_file ).toString();
        var data = JSON.parse( data_raw );

        var email_template = Handlebars.compile( mjml_file );
        mjml_file = email_template( data );
    }

    var html_file = mjml.mjml2html( mjml_file );

    res.send( html_file );
} );

app.listen( 5432, function( err ) {
    console.log( 'Server Started. View at: http://localhost:5432/<filename.mjml>' );
} );
