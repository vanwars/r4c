$( document ).ready(function() {
	// create an AppRouter class based on the config file that
	// user made:
	var AppRouter = Backbone.Router.extend({
		routes: config.urls
	});
	config.router = new AppRouter();

	//1. Append crossDomain = true option:
	var proxiedSync = Backbone.sync;
	Backbone.sync = function(method, model, options) {
		options || (options = {});
		options.crossDomain = true;
		return proxiedSync(method, model, options);
	};
	
	//2. Attach basic authentication credentials to each request.
	//	 Note that this is insecure and credentials are being
	//	 passed via plain text.
	$.ajaxSetup({
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization",
				"Basic " + btoa(config.username + ":" + config.password));
		}
	});
	
	//3. load the templates and render the first page:
	app.utils.loadTemplate(config.templateNames, function() {
		Backbone.history.start();
		// if a user was previously logged in,
		// log him/her back in again:
		loginUser();
	});
	
	
	//loginUser()
	
});

function loginUser() {
	var username = localStorage["username"];
	var password = localStorage["password"];
	if (username && password) {
		var users = new Users();
		users.fetch({
			data: {
				query: "WHERE username ='" + username +
					"' and password ='" + password + "'"
			},
			success: function(response){
				if(response.length ==1)
					config.user = users.at(0);
				config.headerView = new HeaderView({
					el: '#menu',
					loggedInTemplateName: 'MenuLoggedIn',
					anonymousTemplateName: 'AnonymousMenu',
					user: config.user
				});
			}
		});
	}
	else {
		config.headerView = new HeaderView({
			el: '#menu',
			loggedInTemplateName: 'MenuLoggedIn',
			anonymousTemplateName: 'MenuAnonymous'	
		});
	}
}