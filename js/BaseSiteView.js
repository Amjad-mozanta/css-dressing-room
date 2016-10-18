
var BaseSiteElementView = Backbone.View.extend({

	initialize: function () {

		this.listenTo(this.model, 'change', this.applyModel, this);
		this.applyModel();
	},

	applyModel: function () {

		var css = this.model.toJSON();
		delete css.id;

		this.$el.css(css);
	}
});

var BaseSiteView = Backbone.View.extend({

	SiteElementClass: BaseSiteElementView,

	$template: $($.parseHTML($("#site-template").text())),

	initialize: function () {

		// TODO: Leaking subviews?
		// Build the subviews. Each DOM node in the site template knows
		// what selector it uses, through the `rel` attribute.
		this.subViews = this.$el.find('[rel]').get()
			.map(function (el) {

				return new this.SiteElementClass({
					el: el,
					model: this.model.get('styles').get(el.attributes['rel'].value)
				});

			}.bind(this));
	}
});
