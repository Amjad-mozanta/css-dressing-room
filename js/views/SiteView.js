"use strict";

var SiteView = BaseSiteView.extend({

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
