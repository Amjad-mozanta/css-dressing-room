var CurrentSiteView = Backbone.View.extend({

	initialize: function(options) {
		this.app = options.app;
	},

	setSite: function(site){

		applyModelToElement(site, this.$el);
	}
});
