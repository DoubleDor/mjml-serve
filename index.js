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
    mjml = require( 'mjml' );

var app = express();

var base_dir = process.cwd();

if( process.argv.length === 3 ) {
    console.log( process.argv );
    if( path.isAbsolute( process.argv[ 2 ] ) ) {
        base_dir = process.argv[ 2 ];
    } else {
        base_dir = path.join( process.cwd(), process.argv[ 2 ] );
    }
}

app.get( '/:filename', function( req, res ) {
    var mjml_file = fs.readFileSync( path.resolve( base_dir, req.params.filename ) ).toString();
    var html_file = mjml.mjml2html( mjml_file );
    res.send( html_file );
} );

app.listen( 5432, function( err ) {
    console.log( 'Server Started. View at: http://localhost:5432/<filename.mjml>' );
} );
