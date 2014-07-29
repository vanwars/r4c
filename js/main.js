var config = {
	username: 'vanwars',
	password: 'my_password',
	templateNames: [
		'UniversityList',
		'UniversityDetail',
		'SplashPage',
		'Register',
		'MainMenu',
		'Profile',
		'Login',
		'MenuLoggedIn',
		'MenuAnonymous',
		'ClassList',
		'ClassDetail',
		'ClassEdit'
	],
	urls: {
		"": "mainMenu",
		"welcome": "welcome",
		"register": "register",
		"profile": "profile",
		"test": "test",
		"login": "login",
		"logout": "logout",
		"universities": "universityList",
		"universities/:id": "universityDetail",
		"classes": "classList",
		"classes/:id": "classDetail"
	},
	user: null,
	headerView: null,
	footerView: null,
	loginURL: "login"
};

var AppRouter = Backbone.Router.extend({
	routes: config.urls,
	welcome: function(){
		new StaticView({
			el: '#content',
			templateName: 'SplashPage'	
		});
	},
	test: function(){
		new DetailView({
			el: '#content',
			model: new University({ id: id }),
			templateName: 'Test'
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
	classList: function(){
		var opts = {
			el: '#content',
			collection: new Classes(),
			templateName: 'ClassList'
		};
		if (config.user)
			opts.filter = 'where user_id = ' + config.user.id;
		new ListViewProtected(opts);
	},
	universityDetail: function (id) {
		new DetailView({
			el: '#content',
			model: new University({ id: id }),
			templateName: 'UniversityDetail'
		});
	},
	classDetail: function (id) {
		new DetailViewProtected({
			el: '#content',
			model: new Class({ id: id }),
			templateName: 'ClassDetail'
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