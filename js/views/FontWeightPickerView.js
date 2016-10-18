"use strict";


var FontWeightPickerView = PickerView.extend({


	initialize: function (options) {

		this.collection = new Backbone.Collection();

		PickerView.prototype.initialize.apply(this, arguments);

		this.listenTo(options.fontFamilyPickerView, 'select', this.onFamilySelect, this);
	},


	onFamilySelect: function (family) {

		this.collection.set(family.get('weights'));
	}

});
