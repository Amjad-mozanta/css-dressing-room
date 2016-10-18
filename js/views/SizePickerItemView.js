"use strict";


var SizePickerItemView = BasePickerItemView.extend({


	initialize: function (options) {

		BasePickerItemView.prototype.initialize.apply(this, arguments);

		var value = this.model.get('value');
		this.$('.js-title')
			.css({'font-size': value})
			.text(value);
	}

});
