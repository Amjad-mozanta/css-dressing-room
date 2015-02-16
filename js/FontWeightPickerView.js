"use strict";

var FontWeightPickerView = PickerView.extend({


	initialize: function (options) {

		this.collection = new Backbone.Collection();

		PickerView.prototype.initialize.apply(this, arguments);

		this.listenTo(options.fontFamilyPickerView, 'change', this.onFamilyChange, this);
	},


	onFamilyChange: function (family) {

		this.collection.set(family.get('weights').map(function (weight) {

			return {
				id: weight,
				weight: weight
			};
		}));
	}
	
});
