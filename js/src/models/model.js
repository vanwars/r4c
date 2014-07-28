Model = Backbone.Model.extend({
	
	initialize: function(opts) {
		$.extend(this, opts);
		this.validators = {};

        this.validators.first_name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a first name"};
        };

        this.validators.last_name = function (value) {
			return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a last name"};
		};
	},
	
	url: function() {
		/*
		Terrible hack to accomodate the Django REST Framework. Before the
		browser issues a POST, PUT, or PATCH request, it first issues an
		OPTIONS request to ensure that the request is legal. For some reason,
		the Local Ground produces an error for this OPTIONS request if a
		'/.json' footer isn't attached to the end. Hence this function overrides
		the based url() funciton in backbone
		*/
		var base =
			_.result(this, 'urlRoot') ||
			 _.result(this.collection, 'url') ||
			urlError();
		if (this.isNew()) return base + '.json';
		return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id) + '/.json';
    },
	
	validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

});