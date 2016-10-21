"use strict";

var CurrentSiteElementView = BaseSiteElementView.extend({

	events: {
		'click': 'onClick'
	},

	onClick: function (e) {

		// Don't open multiple dialogs for nested elements.
		e.stopPropagation();

		new StyleDialogView({
			model: this.model
		});
	}
});


var CurrentSiteView = BaseSiteView.extend({

	SiteElementClass: CurrentSiteElementView,
});
