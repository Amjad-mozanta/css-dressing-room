"use strict";


var ColorPickerItemView = BasePickerItemView.extend({


	initialize: function (options) {

		BasePickerItemView.prototype.initialize.apply(this, arguments);

		var value = this.model.get('value');
		this.$('span.background')
			.css({background: value})
			.find('.js-title')
			.text(value);
	}

});
