"use strict";


var ColorPickerItemView = BasePickerItemView.extend({


	initialize: function (options) {

		BasePickerItemView.prototype.initialize.apply(this, arguments);

		var value = this.model.get('color');
		this.$('label')
			.css({background: value})
			.find('.js-title')
				.text(value);
	}

});
