var app_router;
$( document ).ready(function() {
	// create an AppRouter class based on the config file that
	// user made:
	var AppRouter = Backbone.Router.extend({
		routes: config.urls
	});
	app_router = new AppRouter();

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
	
	//3. Start the router:
	app.utils.loadTemplate(config.templateNames, function() {
		config.headerView = new HeaderView({
			el: '#menu',
			loggedInTemplateName: 'MenuLoggedIn',
			anonymousTemplateName: 'MenuAnonymous'	
		});
		Backbone.history.start();
	});
});