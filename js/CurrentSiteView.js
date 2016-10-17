"use strict";

// TODO: Have sub views that get their own model from the collection for their style.
var CurrentSiteView = Backbone.View.extend({

	events: {
		'click': 'onClick'
	},

	initialize: function(options) {

		this.selectedModel = null;
		this.listenTo(this.collection, 'select', this.onSelect, this);
		this.listenTo(this.collection, 'select change', this.onSelectOrChange, this);
	},

	onSelect: function(model) {

		this.selectedModel = model;
	},

	onSelectOrChange: function(model) {

		applyModelToElement(model, this.$el);
	},

	onClick: function (e) {

		e.preventDefault();
		e.stopPropagation();

		new StyleDialogView({
			model: this.selectedModel.get('styles').get(e.target.attributes['rel'].value)
		});
	}
});
