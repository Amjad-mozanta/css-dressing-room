
var AddSiteView = Backbone.View.extend({

	events: {
		"click": "addSite",
	},

	addSite: function(e) {

		this.collection.add(new Site());
	}
});
