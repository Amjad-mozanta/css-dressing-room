		
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
		"change #headline-font": "changeHeadlineFont",
		"change #headline-color": "changeHeadlineColor",
		"change #body-font": "changeBodyFont",
		"change #body-color": "changeBodyColor",
		"change #lead-color": "changeLeadColor",
		"change #lead-bold": "changeLeadBold",
		"change #background-color": "changeBackgroundColor"
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
				headline: {
					font: "Comic Sans MS",
					color: "#5cf"
				},
				body: {
					font: "Verdana",
					color: "black"
				},
				lead: {
					color: "black",
					bold: true
				},
				background: {
					color: "#eee"
				}
			}
		});
		
		this.app.setSelectedSite(site);
	},
	
	changeHeadlineFont: function(e) {
		
		// *Deep copy* the old style. Just getting it is not enough, since Backbone will compare it to itself. (The object passed around is the same as the one stored originally.)
		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.headline.font = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},
	
	changeHeadlineColor: function(e) {

		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.headline.color = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},
	
	changeBodyFont: function(e) {
		
		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.body.font = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},
	
	changeBodyColor: function(e) {

		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.body.color = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},
	
	changeLeadColor: function(e) {

		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.lead.color = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},
	
	changeLeadBold: function(e) {

		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.lead.bold = !!$(e.target).attr("checked");

		this.app.getSelectedSite().set({style: style});
	},
	
	changeBackgroundColor: function(e) {

		var style = $.extend(true, {}, this.app.getSelectedSite().get("style"));

		style.background.color = $(e.target).find("option:selected").val();

		this.app.getSelectedSite().set({style: style});
	},
	
	setSite: function(model) {
		var style = model.toJSON().style;
		
		this.$el.find("#headline-font").val(style.headline.font);
		this.$el.find("#headline-color").val(style.headline.color);

		this.$el.find("#body-font").val(style.body.font);
		this.$el.find("#body-color").val(style.body.color);

		this.$el.find("#lead-color").val(style.lead.color);
		this.$el.find("#lead-bold").attr("checked", style.lead.bold);

		this.$el.find("#background-color").val(style.background.color);
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
		
		var data = site.toJSON();

		this.$el.find("h2").css({
			color: data.style.headline.color,
			"font-family": data.style.headline.font
		});

		this.$el.find("p").css({
			color: data.style.body.color,
			"font-family": data.style.body.font
		});

		this.$el.find("p.lead").css({
			color: data.style.lead.color,
			"font-weight": data.style.lead.bold ? "bold" : "normal"
		});

		this.$el.css({
			"background-color": data.style.background.color
		});
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
