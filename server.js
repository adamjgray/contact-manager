"use strict";

var _ = require( 'underscore' );
var express = require( 'express' );
var app = express();

app.use( express.static( __dirname + '/public' ) );
app.use( express.bodyParser() );

var items = [];

app.get( '/items', function( req, res ) {
	res.setHeader( 'content-type', 'application/json' );
	res.send( JSON.stringify( _.values( items ) ) );
});

app.get( '/items/:id', function( req, res ) {
	res.setHeader( 'content-type', 'application/json' );
	res.send( JSON.stringify( items[ req.params.id ] || {} ) );
});

app.post( '/items', function( req, res ) {
	var item = req.body;
	item.id = items.length;
	items[ item.id ] = item;
	res.setHeader( 'content-type', 'application/json' );
	res.send( JSON.stringify( item ) );
});

app.put( '/items/:id', function( req, res ) {
	items[ req.params.id ] = req.body;
	res.setHeader( 'content-type', 'application/json' );
	res.send( JSON.stringify( req.body ) );
});

app.listen( 3000 );
console.log( 'listening on port 3000' );
