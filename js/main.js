var config = {
	templateNames: [
		'UniversityList',
		'UniversityDetail',
		'SplashPage',
		'Register',
		'MainMenu',
		'Profile'
	],
	templates: {},
	username: 'vanwars',
	password: 'my_password'
};

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "mainMenu",
		"welcome": "welcome",
		"register": "register",
		"profile": "profile",
		"universities": "universityList",
		"universities/:id": "universityDetail"
	},
	welcome: function(){
		new StaticView({
			el: '#content',
			templateName: 'SplashPage'	
		});
	},
	mainMenu: function(){
		new StaticView({
			el: '#content',
			templateName: 'MainMenu'
		});
	},
	universityList: function(){
		var universities = new Universities();
		new ListView({
			el: '#content',
			collection: universities,
			templateName: 'UniversityList'
		});
	},
	universityDetail: function (id) {
		new DetailView({
			el: '#content',
			Type: University,
			id: id,
			templateName: 'UniversityDetail'
		});
	},
	profile: function () {
		new DetailUpdateView({
			el: '#content',
			Type: User,
			id: 1,
			templateName: 'Profile'	
		});	
	},
	register: function(){
		new DetailUpdateView({
			el: '#content',
			Type: User,
			templateName: 'Register'	
		});
	}
});


$(function() {
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
		app_router = new AppRouter();
		Backbone.history.start();
	});
		
});






