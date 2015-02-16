"use strict";

var PickerView = Backbone.View.extend({


	$template: $($.parseHTML(
		$('script.js-picker[type="template/html"]').text()
	)),


	initialize: function (options) {

		this.$('.js-title').text(options.title);
		this.$el.addClass(options.class);

		this.ItemView = options.ItemView;
		this.$ul = this.$('.js-items')

		this.collection.on('add', this.add, this);
	},


	add: function (model) {

		var view = new this.ItemView({
			model: model,
			pickerView: this
		});

		view.$el.appendTo(this.$ul);
	}
	
});
