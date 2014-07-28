var config = {
	templateNames: [
		'UniversityList',
		'UniversityDetail',
		'SplashPage',
		'Register',
		'MainMenu',
		'Profile',
		'Login',
		'MenuLoggedIn',
		'MenuAnonymous'	
	],
	templates: {},
	username: 'vanwars',
	password: 'my_password',
	user: null,
	headerView: null
};

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "mainMenu",
		"welcome": "welcome",
		"register": "register",
		"profile": "profile",
		"login": "login",
		"logout": "logout",
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
		new ListView({
			el: '#content',
			collection: new Universities(),
			templateName: 'UniversityList'
		});
	},
	universityDetail: function (id) {
		new DetailView({
			el: '#content',
			model: new University({ id: id }),
			templateName: 'UniversityDetail'
		});
	},
	profile: function () {
		new DetailUpdateView({
			el: '#content',
			model: config.user,
			templateName: 'Profile'	
		});	
	},
	register: function(){
		new DetailUpdateView({
			el: '#content',
			model: new User(),
			templateName: 'Register'	
		});
	},
	login: function(){
		new LoginView({
			el: '#content',
			collection: new Users(),
			templateName: 'Login'	
		});
	},
	logout: function(){
		config.user = null;
		config.headerView.render();
		app_router.navigate("/login", true);
	}
});

app_router = new AppRouter();


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
		config.headerView = new HeaderView({
			el: '#menu',
			loggedInTemplateName: 'MenuLoggedIn',
			anonymousTemplateName: 'MenuAnonymous'	
		});
		Backbone.history.start();
	});
	
	
	
		
});






