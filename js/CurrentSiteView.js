var CurrentSiteView = Backbone.View.extend({

	initialize: function(options) {

		this.listenTo(this.collection, 'select change', this.onSelectOrChange, this);
	},

	onSelectOrChange: function(model) {

		applyModelToElement(model, this.$el);
	}
});
