"use strict";

var SiteElement = Backbone.View.extend({

	events: {
		'click': 'onClick'
	},

	initialize: function(options) {

		this.listenTo(this.model, 'change', this.applyModel, this);
		this.applyModel();
	},

	applyModel: function(model) {

		var css = this.model.toJSON();
		delete css.id;

		this.$el.css(css);
	},

	onClick: function (e) {

		// TODO: This feels out of place.
		e.preventDefault();
		e.stopPropagation();

		new StyleDialogView({
			model: this.model
		});
	}
});


var CurrentSiteView = Backbone.View.extend({

	$template: $($.parseHTML($("#site-template").text())),

	initialize: function(options) {

		// TODO: Leaking subviews?
		// Build the subviews. Each DOM node in the site template knows
		// what selector it uses, through the `rel` attribute.
		this.subViews = this.$el.find('[rel]').get()
			.map(function (el) {

				return new SiteElement({
					el: el,
					model: this.model.get('styles').get(el.attributes['rel'].value)
				});

			}.bind(this));
	}
});
