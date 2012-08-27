		
var Site = Backbone.Model.extend({
	initialize: function(){
	}
});


var Sites = Backbone.Collection.extend({
	model: Site,
	localStorage: new Store("sites")
});


var EditSiteView = Backbone.View.extend({

	events: {
		"click #add-site": "addSite",
		"change #style-settings": "changeStyleSettings",
	},

	initialize: function() {
		this.app = this.options.app;
	},

	addSite: function(e) {

		var site = this.collection.create({
			content: {
				headline: "Lorem ipsum",
				byline: {
					name: "Praesent Feugiat",
					url: "http://geon.github.com",
				},
				lead: "Dolor sit amet, consectetur adipiscing elit. Sed enim turpis, placerat vel faucibus eget, accumsan semper nisl. Curabitur suscipit laoreet enim nec luctus. Sed quis ornare massa. Sed posuere turpis nec mi porta at dictum libero condimentum. Nulla nulla sapien, convallis sed egestas vel, aliquet a nibh.",
				body1: "Curabitur ornare hendrerit lacinia. Sed et tincidunt elit. Pellentesque mi lacus, pellentesque eu porttitor vel, tempus consequat odio. Donec pharetra blandit condimentum. In nec dolor est, quis elementum purus. Mauris vel libero arcu, ac bibendum est.",
				"block-quote": "Donec quis tortor eros, a ultrices tellus. Nulla vehicula semper ipsum sed semper. Vestibulum sed condimentum odio. Suspendisse non eros ac odio consectetur malesuada. Nulla facilisi.",
				body2: "Vivamus venenatis interdum lacus, sed imperdiet lectus congue nec. Praesent et dolor sit amet eros tempus consectetur sed a elit. Integer dictum, odio eget imperdiet porta, quam libero ornare erat, a varius mi quam eget libero. Vestibulum eget laoreet urna. Integer auctor eros et augue gravida tristique. Pellentesque eget eleifend enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed luctus tristique lorem, ut commodo nulla lacinia eget."
			},
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
				lead: {
					color: "#eee",
					"font-size": "20px",
					"font-family": "Verdana",
					"font-weight": "normal",
					"font-style": "normal"
				},
				background: {
					"background-color": "#444"
				}
			}
		});
		
		this.app.setSelectedSite(site);
	},
	
	changeStyleSettings: function(e) {

		// *Deep copy* the old style. Just getting it is not enough, since Backbone will compare it to itself. (The object passed around is the same as the one stored originally.)
		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style[e.target.parentElement.className][e.target.className] = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},

	// Set the styling controls to match the model.
	setSite: function(model) {
				
		// The relevant data.
		var style = model.toJSON().style;
		
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


var SitesView = Backbone.View.extend({

	initialize: function() {

		this.collection.on("add", this.prependSite, this);
		
		this.app = this.options.app;

		this.template = Hogan.compile($("#site-template").text());
	},

	prependSite: function(site) {
		
		var siteElement = $(this.template.render(site.toJSON().content));
		
		site.view = new SiteView({
			el: siteElement,
			collection: this.collection,
			model: site,
			app: this.app
		});
		
		this.$el.prepend(siteElement);
	}
});


var SiteView = Backbone.View.extend({

	initialize: function() {
		this.model.on("change", this.updateSite, this);
		
		this.app = this.options.app;
	},

	updateSite: function(site) {

		var style = site.toJSON().style;

		var specialElementNames = [
			'background',
			'lead'
		];

		// Map over all "normal" style rules, the ones with a 1:1 mapping to a tag name.
		var normalStyleRules = _.pick(style, _.difference(_.keys(style), specialElementNames));
		_.map(normalStyleRules, function(value, tagName) {

			// Simply set the style on the elements of that name.
			this.$el.find(tagName).css(value);
			
		}, this);

		// These are a bit special:
		this.$el.find("p.lead").css(style.lead)	// The .lead should override the p-style.
		this.$el.css(style.background);			// The background color should be applied to the site container as a whole.
	},

	events: {
		"click": "selectSite"
	},
	
	selectSite: function(e) {
		
		this.app.setSelectedSite(this.model);
	}
});


function App() {
	
	this.selectedSite = null;

	this.setSelectedSite = function(model) {
		this.selectedSite = model;
		_.map(model.collection.models, function(model){
			model.view.$el.removeClass("selected");
		});
		model.view.$el.addClass("selected");
		
		this.editSiteView.setSite(model);
	};

	this.getSelectedSite = function() {
		return this.selectedSite;
	};


	this.sites = new Sites();
//	sites.fetch();
	
	this.editSiteView = new EditSiteView({
		el: $("#site-controls"),
		collection: this.sites,
		app: this
	});

	this.sitesView = new SitesView({
		el: $("#sites"),
		collection: this.sites,
		app: this
	});

};


$(function(){
	
	var app = new App();	
});
