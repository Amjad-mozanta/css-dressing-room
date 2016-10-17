"use strict";

// TODO: Unify with CurrenSiteView, using common base views.
var SiteElementView = Backbone.View.extend({

	initialize: function(options) {

		this.listenTo(this.model, 'change', this.applyModel, this);
		this.applyModel();
	},

	applyModel: function(model) {

		var css = this.model.toJSON();
		delete css.id;

		this.$el.css(css);
	}
});

var SiteView = Backbone.View.extend({

	$template: $($.parseHTML($("#site-template").text())),


	events: {
		"click .delete-button": "deleteSite",
		"click": "selectSite"
	},


	initialize: function(options) {

		// TODO: Leaking subviews?
		// Build the subviews. Each DOM node in the site template knows
		// what selector it uses, through the `rel` attribute.
		this.subViews = this.$el.find('[rel]').get()
			.map(function (el) {

				return new SiteElementView({
					el: el,
					model: this.model.get('styles').get(el.attributes['rel'].value)
				});

			}.bind(this));
	},


	deleteSite: function(e) {

		this.collection.remove(this.model);
		this.el.remove();
	},


	selectSite: function(e) {

		this.model.trigger('select', this.model);
	}
});
