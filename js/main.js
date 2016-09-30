"use strict";


function applyModelToElement(site, element){

	site.get("styles").each(function(style) {

		var css = style.toJSON();
		var selector = css.id;
		delete css.id;

		// Simply set the style on the elements of that name.
		element.find(selector).css(css);
	});
}


$(function(){

	var app = new App();
});
