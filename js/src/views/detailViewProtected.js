var DetailViewProtected = DetailView.extend({
	//redirects to login page
	initialize: function(opts) {
		if (config.user == null)
			app_router.navigate(config.loginURL, true);
		else
			DetailViewProtected.__super__.initialize.apply(this, arguments);
	}
	
});