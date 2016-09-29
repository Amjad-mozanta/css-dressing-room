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