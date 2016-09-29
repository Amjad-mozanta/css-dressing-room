"use strict";


var defaults = {
	style: {
		h2: {
			"font-family": "Georgia",
			color: "#5cf",
			"font-size": "36px",
			"font-weight": "normal",
			"font-style": "normal"
		},
		a: {
			color: "#f4a",
			"font-weight": "normal",
			"font-style": "normal",
			"text-decoration": "none"
		},
		p: {
			color: "#ccc",
			"font-size": "16px",
			"font-family": "Verdana",
			"font-weight": "normal",
			"font-style": "normal"
		},
		blockquote: {
			color: "#5cf",
			"font-size": "20px",
			"font-family": "Verdana",
			"font-weight": "normal",
			"font-style": "italic"
		},
		"p.lead": {
			color: "#eee",
			"font-size": "20px",
			"font-family": "Verdana",
			"font-weight": "normal",
			"font-style": "normal"
		},
		"div.background": {
			"background-color": "#444"
		}
	}
};


var Site = Backbone.Model.extend({
	initialize: function(){
	},
	defaults: defaults
});


var Sites = Backbone.Collection.extend({
	model: Site,
	initialize: function(models, options) {
		this.app = options.app;
		this.on("add", this.onAdd, this);
	},
	onAdd: function(model) {

		this.app.setSelectedSite(model);
	}
});


var AddSiteView = Backbone.View.extend({

	events: {
		"click": "addSite",
	},

	addSite: function(e) {

		this.collection.add(new Site());
	}
});


var EditSiteView = Backbone.View.extend({

	events: {
		"change #style-settings": "changeStyleSettings",
	},

	initialize: function(options) {
		this.app = options.app;
	},

	changeStyleSettings: function(e) {

		// *Deep copy* the old style. Just getting it is not enough, since Backbone will compare it to itself. (The object passed around is the same as the one stored originally.)
		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style[e.target.parentElement.className][e.target.className] = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
		this.app.currentSiteView.setSite(this.app.getSelectedSite());
	},

	// Set the styling controls to match the model.
	setSite: function(model) {

		// The relevant data.
		var style = model.get("style");

		// Map over all the element types.
		var settingsRootElement = this.el;
		_.map(style, function(styling, elementType){

			// The controls for each element type are grouped in a div with the class = it's key in the style object.
			var settingsElement = settingsRootElement.getElementsByClassName(elementType)[0];

			// Map over all the style settings for that element type.
			_.map(styling, function(value, key){

				// The controls for each style setting has the class = it's key in the styling object.
				var selectionElement = settingsElement.getElementsByClassName(key)[0];

				// Simply set the control to whatever is in the styling.
				selectionElement.value = value;
			});
		});
	}
});


var CurrentSiteView = Backbone.View.extend({

	initialize: function(options) {
		this.app = options.app;
	},

	setSite: function(site){

		applyModelToElement(site, this.$el);
	}
});


var SitesView = Backbone.View.extend({


	initialize: function(options) {

		this.collection.on("add", this.appendSite, this);

		this.app = options.app;
	},


	appendSite: function(site) {

		site.view = new SiteView({
			collection: this.collection,
			model: site,
			app: this.app
		});

		site.view.$el.insertBefore(this.$el.find("li#add-site"));
	}
});


function applyModelToElement(site, element){

	_.each(site.get("style"), function(value, tagName) {

		// Simply set the style on the elements of that name.
		element.find(tagName).css(value);
	});
}


var SiteView = Backbone.View.extend({


	$template: $($.parseHTML($("#site-template").text())),


	initialize: function(options) {

		this.model.on("change", this.updateSite, this);

		this.app = options.app;

		applyModelToElement(this.model, this.$el);
	},


	updateSite: function(site){

		applyModelToElement(site, this.$el);
	},


	events: {
		"click .delete-button": "deleteSite",
		"click": "selectSite"
	},


	deleteSite: function(e) {

		this.collection.remove(this.model);
		this.el.remove();
	},


	selectSite: function(e) {

		this.app.setSelectedSite(this.model);
	}
});


function App() {

	this.selectedSite = null;

	this.setSelectedSite = function(model) {
		this.selectedSite = model;

		this.editSiteView.setSite(model);
		this.currentSiteView.setSite(model);
	};

	this.getSelectedSite = function() {
		return this.selectedSite;
	};

	this.sites = new Sites([], {
		app: this
	});
//	this.sites.fetch();

	this.sitesView = new SitesView({
		el: $("#sites"),
		collection: this.sites,
		app: this
	});

	this.addSiteView = new AddSiteView({
		el: $("#add-site"),
		collection: this.sites
	});

	this.editSiteView = new EditSiteView({
		el: $("#site-controls"),
		collection: this.sites,
		app: this
	});

	var siteElement = SiteView.prototype.$template.clone().find('.site');
	siteElement.appendTo($("#current-site"));
	this.currentSiteView = new CurrentSiteView({
		el: siteElement,
		app: this
	});

	this.sites.add(new Site());
};


$(function(){

	var app = new App();
});
