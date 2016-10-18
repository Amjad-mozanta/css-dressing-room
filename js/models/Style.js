"use strict";


var Style = Backbone.Model.extend({

	defaults: {
		"font-family": "Helvetica",
		color: "black",
		"font-size": "1em",
		"font-weight": "normal",
		"font-style": "normal"
	}
});


var Styles = Backbone.Collection.extend({

	model: Style
});
