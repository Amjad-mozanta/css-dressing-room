
var defaults = {
	style: {
		h2: {
			"font-family": "Georgia",
			color: "#5cf",
			"font-size": "36px",
			"font-weight": "normal",
			"font-style": "normal"
		},
		a: {
			color: "#f4a",
			"font-weight": "normal",
			"font-style": "normal",
			"text-decoration": "none"
		},
		p: {
			color: "#ccc",
			"font-size": "16px",
			"font-family": "Verdana",
			"font-weight": "normal",
			"font-style": "normal"
		},
		blockquote: {
			color: "#5cf",
			"font-size": "20px",
			"font-family": "Verdana",
			"font-weight": "normal",
			"font-style": "italic"
		},
		"p.lead": {
			color: "#eee",
			"font-size": "20px",
			"font-family": "Verdana",
			"font-weight": "normal",
			"font-style": "normal"
		},
		"div.background": {
			"background-color": "#444"
		}
	}
};


var Site = Backbone.Model.extend({
	initialize: function(){
	},
	defaults: defaults
});


var Sites = Backbone.Collection.extend({
	model: Site
});
