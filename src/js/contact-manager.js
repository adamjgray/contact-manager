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

	// Views
	var ContactView = Marionette.ItemView.extend({
		tagName: 'tr',
		template: _.template( $( '#contact-template' ).html() ),
		events: {
			'click': 'loadDetails'
		},
		loadDetails: function() {
			app.router.navigate( 'contacts/' + this.model.get( 'id' ), { trigger: true } );
		}
	});

	var ContactsView = Marionette.CompositeView.extend({
		template: _.template( $( '#contacts-template' ).html() ),
		itemView: ContactView,
		itemViewContainer: 'tbody',
		events: {
			'click .add-contact': 'addContact'
		},
		addContact: function() {
			var contact = this.collection.create({
				name: 'New Contact'
			});
		}
	});

	var ContactDetailView = Marionette.ItemView.extend({
		template: _.template( $( '#contact-detail' ).html() ),
		events: {
			'click button': 'saveContact'
		},
		ui: {
			name: '.name',
			phone: '.phone',
			twitter: '.twitter'
		},
		saveContact: function( $event ) {
			$event.preventDefault();

			this.model.save({
				name: this.ui.name.val(),
				phone: this.ui.phone.val(),
				twitter: this.ui.twitter.val()
			});

			app.router.navigate( '', { trigger: true } );
		}
	});

	// Controller provides handlers for the Router
	var ContactController = Marionette.Controller.extend({
		listContacts: function() {
			app.main.show( new ContactsView( {
				collection: app.contacts
			} ) );
		},
		showContact: function( contactId ) {
			app.main.show( new ContactDetailView( {
				model: app.contacts.get( contactId )
			} ) );
		}
	});

	// Router maps URL changes to controller methods
	var ContactRouter = Marionette.AppRouter.extend({
		appRoutes: {
			'': 'listContacts',
			'contacts/:id': 'showContact'
		}
	});

	// instantiate values
	var app = new Marionette.Application();

	// regions are areas of the page where youu can
	// show other views.
	app.addRegions({
		main: '.main'
	});

	// instantiate the collection
	app.contacts = new ContactCollection();

	// instantiate the router
	app.router = new ContactRouter({
		controller: new ContactController( app )
	});

	// fetch the contacts from the server
	// when they are received start the routing
	app.contacts.fetch( { success: function() {
		Backbone.history.start();
	} } );

})( this );