'use strict';


var Site = Backbone.Model.extend({

	defaults: {
		styles: [
			{
				'id': 'h2',
				'font-family': 'Georgia',
				color: '#5cf',
				'font-size': '2.25em',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'a',
				color: '#f4a',
				'font-weight': 'normal',
				'font-style': 'normal',
				'text-decoration': 'none'
			},
			{
				'id': 'p',
				color: '#ccc',
				'font-size': '1em',
				'font-family': 'Verdana',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'blockquote',
				color: '#5cf',
				'font-size': '1.25em',
				'font-family': 'Verdana',
				'font-weight': 'normal',
				'font-style': 'italic'
			},
			{
				'id': 'p.lead',
				color: '#eee',
				'font-size': '1.25em',
				'font-family': 'Verdana',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'div.background',
				'background-color': '#444',
				'font-size': '14px'
			}
		]
	},

	relations: {
		styles: Styles,
	}
});


var Sites = Backbone.Collection.extend({

	model: Site
});
