function welcome(){
	new StaticView({
		el: '#content',
		templateName: 'SplashPage'	
	});
}

function mainMenu(){
	new StaticView({
		el: '#content',
		templateName: 'MainMenu'
	});
}

function universityList(){
	if (config.universities == null)
		config.universities = new Universities();
	
	new ListView({
		el: '#content',
		collection: config.universities,
		templateName: 'UniversityList'
	});
}

function classList(){
	if (config.user == null) {
		config.router.navigate(config.loginURL, true);
		return;
	}
	var classes = new Classes();
	var opts = {
		el: '#content',
		collection: classes,
		templateName: 'ClassList',
		extras: {	
			gpa: 5.5,
			user: config.user
		},
		filter: 'where user_id = ' + config.user.id
	};
	new ListViewProtected(opts);
}

function universityDetail(id) {
	new DetailView({
		el: '#content',
		model: new University({ id: id }),
		templateName: 'UniversityDetail'
	});
}

function classDetail(id) {
	new DetailViewProtected({
		el: '#content',
		model: new Class({ id: id }),
		templateName: 'ClassDetail'
	});
}

function profile() {
	new DetailUpdateView({
		el: '#content',
		model: config.user,
		templateName: 'Profile'	
	});	
}

function register(){
	new DetailUpdateView({
		el: '#content',
		model: new User(),
		templateName: 'Register'	
	});
}

function login(){
	new LoginView({
		el: '#content',
		collection: new Users(),
		templateName: 'Login'	
	});
}

function logout(){
	config.user = null;
	config.headerView.render();
	config.router.navigate("/login", true);
}