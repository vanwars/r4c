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
	new ListView({
		el: '#content',
		collection: new Universities(),
		templateName: 'UniversityList'
	});
}

function classList(){
	var opts = {
		el: '#content',
		collection: new Classes(),
		templateName: 'ClassList'
	};
	if (config.user)
		opts.filter = 'where user_id = ' + config.user.id;
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
	app_router.navigate("/login", true);
}