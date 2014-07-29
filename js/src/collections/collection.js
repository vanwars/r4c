var Collection = Backbone.Collection.extend({

	// Reference to this collection's model.
	sort_field: 'id',
	model: Backbone.Model,
	url: null,
	initialize: function(opts){
		$.extend(this, opts);
	},
	parse : function(response) {
		return response.results;
	},
  
	// Todos are sorted by their original insertion order.
	comparator: function( university ) {
		return university.get(this.sort_field);
	},
	sum: function(field) {
		return this.reduce(function(memo, value) { return memo + value.get(field) }, 0);
	},
	average: function(field) {
		return this.sum(field) / this.models.length;
	}
});
