(function( global ) {
	"use strict";

	// models
	var ContactModel = Backbone.Model.extend({
		defaults: {
			name: '',
			phone: '',
			twitter: ''
		}
	});

	var ContactCollection = Backbone.Collection.extend({
		url: '/items',
		model: ContactModel
	});

	// views
	var ContactView = Marionette.ItemView.extend({
		template: _.template( $( '#contact-template' ).html() )
	});

	var ContactsView = Marionette.CompositeView.extend({
		template: _.template( $( '#contacts-template' ).html() ),
		itemView: ContactView,
		itemViewContainer: 'tbody'
	});

	// Controller provides handlers for the Router
	var ContactController = Marionette.Controller.extend({
		initialize: function( app ) {
			this.app = app;
		},
		showContact: function( contactId ) {
			var contact = this.app.contacts.get( contactId );
			this.app.details.show( new ContactDetailView( {
				model: contact
			} ) );
		}
	});

	// Router maps URL changes to controller methods
	var ContactRouter = Marionette.AppRouter.extend({
		appRoutes: {
			'/contacts/:id': 'showContact'
		}
	});

	// instantiate values
	var app = new Marionette.Application();

	// regions are areas of the page where youu can
	// show other views.
	app.addRegions({
		list: '.contact-list',
		details: '.contact-details'
	});

	app.addInitializer( function() {
		// instantiate the collection
		app.contacts = new ContactCollection();
		app.contacts.fetch();

		// instantiate the router
		app.router = new ContactRouter({
			controller: new ContactController( app )
		});

		// show the contacts list in the list region
		app.list.show( new ContactsView( { collection: this.contacts } ) );
	});

	app.on( 'initialize:after', function() {
		Backbone.history.start();
	});

	app.start();

})( this );