var University = Model.extend({
	urlRoot: 'http://dev.localground.org/api/0/forms/1/data/'
});

var User = Model.extend({
	urlRoot: 'http://dev.localground.org/api/0/forms/2/data/',
	defaults: {
		id: null,
		first_name: "",
		last_name: "",
		username: "",
		password: "",
		email: "",
		school_name: "",
		grade: "11th",
		project_id: 2
	}
});