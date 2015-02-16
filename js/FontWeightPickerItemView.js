"use strict";

var FontWeightPickerItemView = BasePickerItemView.extend({


	initialize: function (options) {

		BasePickerItemView.prototype.initialize.apply(this, arguments);

		var value = this.model.get('weight');
		this.$('.js-title')
			.css({'font-weight': value})
			.text(value);
	}

});
