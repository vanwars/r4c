var DetailViewProtected = DetailView.extend({
	//redirects to login page
	initialize: function(opts) {
		if (config.user == null)
			config.router.navigate(config.loginURL, true);
		else
			DetailViewProtected.__super__.initialize.apply(this, arguments);
	}
	
});