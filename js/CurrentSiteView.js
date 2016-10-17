"use strict";

// TODO: Have sub views that get their own model from the collection for their style.
var CurrentSiteView = Backbone.View.extend({

	$template: $($.parseHTML($("#site-template").text())),

	events: {
		'click': 'onClick'
	},

	initialize: function(options) {

		this.listenTo(this.model, 'change', this.onChange, this);
		applyModelToElement(this.model, this.$el);
	},

	onChange: function(model) {

		applyModelToElement(model, this.$el);
	},

	onClick: function (e) {

		e.preventDefault();
		e.stopPropagation();

		new StyleDialogView({
			model: this.model.get('styles').get(e.target.attributes['rel'].value)
		});
	}
});
