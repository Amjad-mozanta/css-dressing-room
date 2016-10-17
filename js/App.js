"use strict";


function App () {

	this.sites = new Sites([]);
//	this.sites.fetch();

	this.sitesView = new SitesView({
		el: $("#sites"),
		collection: this.sites
	});

	// Create a new CurrentSiteView each time a site is selected.
	this.currentSiteView = null;
	this.sites.on('select', function (site) {

		// Clear the old current site.
		if (this.currentSiteView) {

			this.currentSiteView.remove();
		}

		// Create a new current site, and attach it to the DOM.
		this.currentSiteView = new CurrentSiteView({
			model: site
		});
		this.currentSiteView.$el.appendTo($("#current-site"));
	}.bind(this))


	this.sites.add(new Site());
	this.sites.trigger('select', this.sites.models[0]);
};
