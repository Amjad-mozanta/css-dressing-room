"use strict";

var fontFamilies = [
	'Arial',
	'Arial Black',
	'Comic Sans MS',
	'Courier New',
	'Georgia',
	'Impact',
	'Tahoma',
	'Times New Roman',
	'Trebuchet MS',
	'Verdana'
].map(function (family) {

	return {
		id: family,
		value: family,
		weights: ['normal', 'bold']
			.map(function (value) {

				return {
					id: value,
					value: value
				};
			})
	};
});

function normalizeColorCode (color) {

	return color[0] != '#' ?
		color :
		(color.length == 7 ?
			color :
			'#'+color[1]+color[1]+color[2]+color[2]+color[3]+color[3]
		);
}

var colors = [
	'black',
	'#444',
	'#666',
	'#ccc',
	'#eee',
	'white',
	'#f4a',
	'#fb0',
	'#ae0',
	'#5cf'
].map(function (color) {

	return {
		id: normalizeColorCode(color),
		value: color
	};
});

var sizes = [
	'1em',
	'1.125em',
	'1.25em',
	'1.5em',
	'1.75em',
	'2em',
	'2.25em',
	'2.5em',
	'3em',
].map(function (size) {

	return {
		id: size,
		value: size
	};
});

var StyleDialogView = Backbone.View.extend({


	events: {

		'click i.js-cancel': 'cancel',
		'click div.bottom-buttons button.js-save'  : 'save'
	},


	$template: $($.parseHTML(
		$('script#style-dialog-template[type="text/template-html"]').text()
	)),


	initialize: function (options) {

		// Copy model attributes for cancel.
		this.oldModelAttributes = this.model.toJSON();

		// Show the dialog.
		$('body').addClass('modal-overlay');
		$('#modal-overlay').append(this.$el);

		this.subViews = [];
		var $pickers = this.$el.find('.js-pickers');
		var THIS = this;
		function makePickerViewFromData (pickerData) {

			pickerData.collection = new Backbone.Collection(pickerData.items);

			var selectedValue = THIS.model.get(pickerData.id);
			pickerData.model = new Backbone.Model({
				selectedValue: selectedValue
			});

			var pickerView = new (pickerData.PickerView || PickerView)(pickerData);
			THIS.subViews.push(pickerView);

			// Update the style.
			// TODO: The picker messages the style diealog to update the site style.
			// Make it instead use a model that is the style property. new CssProperty({name: 'color', value: 'black'})
			pickerView.on('select', function (model) {

				THIS.model.set(pickerData.id, model.get('value'));
			});

			pickerView.$el.appendTo($pickers);

			return pickerView;
		}


		var pickerViews = [

			{
				id: 'color',
				title: 'Color',
				ItemView: ColorPickerItemView,
				items: colors
			},

			{
				id: 'font-size',
				title: 'Size',
				ItemView: SizePickerItemView,
				items: sizes
			},

			{
				id: 'font-family',
				title: 'Font Family',
				ItemView: FontFamilyPickerItemView,
				items: fontFamilies
			}
		]
			.map(function (pickerData) {

				return makePickerViewFromData(pickerData);
			});


		// Set this up separately, since it has a dependency.
		// It is a bit special, since it has to listen to the font family change,
		// and list the sizes available for it.
		pickerViews.fontWeight = makePickerViewFromData({
			id: 'font-weight',
			title: 'Font Weight',
			PickerView: FontWeightPickerView,
			ItemView: FontWeightPickerItemView,
			fontFamilyPickerView: pickerViews[2]
		});
	},


	save: function () {

		// Triggers the REST call.
		// this.model.save();

		this.close();
	},


	cancel: function () {

		this.model.set(this.oldModelAttributes);
		this.close();
	},


	close: function () {

		// Close the dialog.
		this.remove();
		$('body').removeClass('modal-overlay');
	},

	// TODO: Move this to the Backbone.View base class.
	remove: function () {

		Backbone.View.prototype.remove.apply(this, arguments);

		this.subViews
			.forEach(function(view){
				view.remove();
			});
	}
});
