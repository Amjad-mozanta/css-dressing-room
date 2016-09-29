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
