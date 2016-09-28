"use strict";


(function () {

	var oldEnsureElement = Backbone.View.prototype._ensureElement;

	Backbone.View.prototype._ensureElement = function () {

		if (this.$template) {

			this.setElement(this.$template.clone());

		} else {

			oldEnsureElement.apply(this, arguments);
		}
	};

})();
