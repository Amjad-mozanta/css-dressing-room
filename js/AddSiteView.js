
var AddSiteView = Backbone.View.extend({

	events: {
		"click": "addSite",
	},

	addSite: function(e) {

		var newSite = new Site();

		this.collection.add(newSite);
		this.collection.trigger('select', newSite);
	}
});
