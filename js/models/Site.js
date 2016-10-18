'use strict';


var Site = Backbone.Model.extend({

	defaults: {
		styles: [
			{
				'id': 'h2',
				'font-family': 'Georgia',
				color: '#55ccff',
				'font-size': '2.25em',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'a',
				color: '#ff44aa',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'p',
				color: '#cccccc',
				'font-size': '1em',
				'font-family': 'Verdana',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'blockquote',
				color: '#55ccff',
				'font-size': '1.25em',
				'font-family': 'Verdana',
				'font-weight': 'normal',
				'font-style': 'italic'
			},
			{
				'id': 'p.lead',
				color: '#eeeeee',
				'font-size': '1.25em',
				'font-family': 'Verdana',
				'font-weight': 'normal',
				'font-style': 'normal'
			},
			{
				'id': 'div.background',
				'background-color': '#444444',
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
