"use strict";

var SizePickerItemView = BasePickerItemView.extend({


	initialize: function (options) {

		BasePickerItemView.prototype.initialize.apply(this, arguments);

		var value = this.model.get('size');
		this.$('.js-title')
			.css({'font-size': value})
			.text(value);
	}
	
});
