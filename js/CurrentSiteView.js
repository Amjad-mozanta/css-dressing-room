var CurrentSiteView = Backbone.View.extend({

	initialize: function(options) {

		this.listenTo(this.collection, 'select', this.onSelect, this);
	},

	onSelect: function(model) {

		applyModelToElement(model, this.$el);
	}
});
