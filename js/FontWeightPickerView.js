"use strict";


var FontWeightPickerView = PickerView.extend({


	initialize: function (options) {

		this.collection = new Backbone.Collection();

		PickerView.prototype.initialize.apply(this, arguments);

		this.listenTo(options.fontFamilyPickerView, 'select', this.onFamilySelect, this);
	},


	onFamilySelect: function (family) {

		// TODO: Make the font family model have a collection instead.
		this.collection.set(family.get('weights').map(function (value) {

			return {
				id: value,
				value: value
			};
		}));
	}

});
