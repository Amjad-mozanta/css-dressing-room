"use strict";


function App () {

	this.sites = new Sites([]);
//	this.sites.fetch();

	this.sitesView = new SitesView({
		el: $("#sites"),
		collection: this.sites
	});

	this.addSiteView = new AddSiteView({
		el: $("#add-site"),
		collection: this.sites
	});

	this.editSiteView = new EditSiteView({
		el: $("#site-controls"),
		collection: this.sites
	});

	var siteElement = SiteView.prototype.$template.clone().find('.site');
	siteElement.appendTo($("#current-site"));
	this.currentSiteView = new CurrentSiteView({
		el: siteElement,
		collection: this.sites
	});

	this.sites.add(new Site());
	this.sites.trigger('select', this.sites.models[0]);
};
