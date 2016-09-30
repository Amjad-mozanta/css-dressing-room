
var EditSiteView = Backbone.View.extend({

	events: {
		"change #style-settings": "changeStyleSettings",
	},

	initialize: function(options) {
		this.app = options.app;
		this.selectedModel = null;
		this.listenTo(this.collection, 'select', this.onSelect, this);
	},

	onSelect: function(model) {

		this.selectedModel = model;
		this.applyModelToElement(model);
	},

	changeStyleSettings: function(e) {

		// *Deep copy* the old style. Just getting it is not enough, since Backbone will compare it to itself. (The object passed around is the same as the one stored originally.)
		var style = $.extend(true, {}, this.selectedModel.get("style"));
		style[e.target.parentElement.className][e.target.className] = $(e.target).find("option:selected").val();
		this.selectedModel.set({style: style});
	},

	// Set the styling controls to match the model.
	applyModelToElement: function(model) {

		// The relevant data.
		var style = model.get("style");

		// Map over all the element types.
		var settingsRootElement = this.el;
		_.map(style, function(styling, elementType){

			// The controls for each element type are grouped in a div with the class = it's key in the style object.
			var settingsElement = settingsRootElement.getElementsByClassName(elementType)[0];

			// Map over all the style settings for that element type.
			_.map(styling, function(value, key){

				// The controls for each style setting has the class = it's key in the styling object.
				var selectionElement = settingsElement.getElementsByClassName(key)[0];

				// Simply set the control to whatever is in the styling.
				selectionElement.value = value;
			});
		});
	}
});
