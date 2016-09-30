"use strict";


var SiteView = Backbone.View.extend({


	$template: $($.parseHTML($("#site-template").text())),


	initialize: function(options) {

		this.model.on("change", this.updateSite, this);

		this.app = options.app;

		applyModelToElement(this.model, this.$el);
	},


	updateSite: function(site){

		applyModelToElement(site, this.$el);
	},


	events: {
		"click .delete-button": "deleteSite",
		"click": "selectSite"
	},


	deleteSite: function(e) {

		this.collection.remove(this.model);
		this.el.remove();
	},


	selectSite: function(e) {

		this.model.trigger('select', this.model);
	}
});