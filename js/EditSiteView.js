
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

		this.selectedModel.get('styles')
			.get(e.target.parentElement.className)
			.set(e.target.className, $(e.target).find("option:selected").val());

		// TODO: Make the site model bubble it's changes.
		this.selectedModel.trigger('change', this.selectedModel, {});
	},

	// Set the styling controls to match the model.
	applyModelToElement: function(model) {

		// The relevant data.
		var styles = model.get("styles");

		// Map over all the element types.
		var settingsRootElement = this.el;
		styles.each(function(styling){

			// The controls for each element type are grouped in a div with the class = it's key in the style object.
			var settingsElement = settingsRootElement.getElementsByClassName(styling.id)[0];

			// Map over all the style settings for that element type.
			var stypeProperties = styling.toJSON();
			delete stypeProperties.id;
			_.map(stypeProperties, function(value, key){

				// The controls for each style setting has the class = it's key in the styling object.
				var selectionElement = settingsElement.getElementsByClassName(key)[0];

				// Simply set the control to whatever is in the styling.
				if (selectionElement) {
					selectionElement.value = value;
				}
			});
		});
	}
});
