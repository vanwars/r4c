var app = app || {};

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
var UniversityList = Backbone.Collection.extend({

	// Reference to this collection's model.
	model: Backbone.Model,
	url: 'http://localground/api/0/forms/9/data/',
	parse : function(response) {
		return response.results;
	},
  
	// Todos are sorted by their original insertion order.
	comparator: function( university ) {
		return university.get('average_gpa');
	}
});

// Create our global collection of **Todos**.
app.universities = new UniversityList();