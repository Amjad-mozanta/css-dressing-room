"use strict";


(function () {

	var oldRemove = Backbone.View.prototype.remove;

	Backbone.View.prototype.remove = function () {

		oldRemove.apply(this, arguments);

		if (this.subviews) {

			this.subviews
				.forEach(function(view){
					view.remove();
				});
		}
	};

})();
