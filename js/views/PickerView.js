"use strict";


var PickerView = Backbone.View.extend({


	$template: $($.parseHTML(
		$('script#picker[type="template/html"]').text()
	)),


	initialize: function (options) {

		this.$('.js-title').text(options.title);
		// this.$el.addClass(options.class);

		this.ItemView = options.ItemView;
		this.$ul = this.$('.js-items')

		this.collection.on('add', this.add, this);
		this.collection.each(function (model) {

			this.add(model);
		}.bind(this));
	},


	add: function (model) {

		// Bubble the selection event.
		model.on('select', function () {

			this.trigger('select', model);
			this.model.set('value')
		}.bind(this))

		var view = new this.ItemView({
			model: model,
			// pickerView: this
		});

		view.$el.appendTo(this.$ul);
	}

});
