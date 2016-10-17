"use strict";


function App () {

	this.sites = new Sites([]);
//	this.sites.fetch();

	this.sitesView = new SitesView({
		el: $("#sites"),
		collection: this.sites
	});

	this.currentSiteView = new CurrentSiteView({
		collection: this.sites
	});
	this.currentSiteView.$el.appendTo($("#current-site"));

	this.sites.add(new Site());
	this.sites.trigger('select', this.sites.models[0]);
};
