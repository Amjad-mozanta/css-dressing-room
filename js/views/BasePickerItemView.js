"use strict";

var BasePickerItemView = Backbone.View.extend({


	events: {
		'change': 'onChange'
	},


	$template: $($.parseHTML(
		$('script#generic-picker-item[type="template/html"]').text()
	)),


	initialize: function (options) {

		// this.pickerView = options.pickerView;
		this.listenTo(this.model, 'remove', this.remove, this);
	},


	onChange: function () {

		// Both the de-selected and the selected option will get a change event.
		if (this.$('input:checked').length) {

			this.model.trigger('select');
		}
	}

});
