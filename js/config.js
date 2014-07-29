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
		"": mainMenu,
		"welcome": welcome,
		"register": register,
		"profile": profile,
		"login": login,
		"logout": logout,
		"universities": universityList,
		"universities/:id": universityDetail,
		"classes": classList,
		"classes/:id": classDetail
	},
	user: null,
	headerView: null,
	footerView: null,
	loginURL: "login"
};