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
		'ProfileEdit',
		'Login',
		'MenuLoggedIn',
		'MenuAnonymous',
		'ClassList',
		'ClassDetail',
		'ClassEdit'
	],
	urls: {
		"": mainMenu,
		"welcome": welcome,
		"register": register,
		"profile": profile,
		"profile/edit": editProfile,
		"login": login,
		"logout": logout,
		"universities": universityList,
		"universities/uc": ucs,
		"universities/cal-state": calState,
		"universities/:id": universityDetail,
		"classes": classList,
		"classes/:id": classDetail
	},
	router: null,
	loginURL: "login",
	user: null,
	context: {
		universities: null
	},
	headerView: null,
	footerView: null,
	project_id: 2
};