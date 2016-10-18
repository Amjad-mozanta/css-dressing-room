"use strict";

var CurrentSiteElementView = BaseSiteElementView.extend({

	events: {
		'click': 'onClick'
	},

	onClick: function (e) {

		// TODO: This feels out of place.
		e.preventDefault();
		e.stopPropagation();

		new StyleDialogView({
			model: this.model
		});
	}
});


var CurrentSiteView = BaseSiteView.extend({

	SiteElementClass: CurrentSiteElementView,
});
