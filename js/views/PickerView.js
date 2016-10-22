"use strict";


var PickerView = Backbone.View.extend({


	$template: $($.parseHTML(
		$('script#picker[type="template/html"]').text()
	)),


	initialize: function (options) {

		this.subviews = [];

		this.attributeName = options.attributeName;
		this.$('.js-title').text(options.title);
		// this.$el.addClass(options.class);

		this.ItemView = options.ItemView;
		this.$ul = this.$('.js-items')

		this.collection.on('add', this.add, this);
		this.collection.each(this.add, this);
	},


	add: function (model) {

		model.on('select', function () {

			this.model.set(this.attributeName, model.id);

		}.bind(this))

		var view = new this.ItemView({
			model: model,
			initallySelectedValue: this.model.get(this.attributeName)
		});

		view.$el.appendTo(this.$ul);

		this.subviews.push(view);
	}

});
