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

function ucs(){
	new ListView({
		el: '#content',
		collection: new Universities(),
		filter: "WHERE university_type = 'UC'",
		templateName: 'UniversityList',
		context: {	
			filter_name: 'UC System'
		}
	});
}

function calState(){
	new ListView({
		el: '#content',
		collection: new Universities(),
		filter: "WHERE university_type = 'Cal State'",
		templateName: 'UniversityList',
		context: {	
			filter_name: 'Cal State System'
		}
	});
}

function classList(){
	if (config.user == null) {
		config.router.navigate(config.loginURL, true);
		return;
	}
	var classes = new Classes();
	new ListView({
		el: '#content',
		collection: classes,
		templateName: 'ClassList',
		restricted: true,
		context: {	
			gpa: function(){
				return classes.average("points_un_weighted");
			}
		},
		filter: 'where user_id = ' + config.user.id
	});
}

function universityDetail(id) {
	new DetailView({
		el: '#content',
		model: new University({ id: id }),
		templateName: 'UniversityDetail'
	});
}

function classDetail(id) {
	new DetailView({
		el: '#content',
		restricted: true,
		model: new Class({ id: id }),
		templateName: 'ClassDetail'
	});
}

function profile() {
	new DetailView({
		el: '#content',
		restricted: true,
		model: config.user,
		templateName: 'Profile'	
	});	
}

function editProfile() {
	new DetailUpdateView({
		el: '#content',
		restricted: true,
		model: config.user,
		templateName: 'ProfileEdit'	
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
	localStorage.clear();
	if (config.headerView) {
		config.headerView.render();
	}
	config.router.navigate("/login", true);
}