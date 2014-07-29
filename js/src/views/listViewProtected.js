var ListViewProtected = ListView.extend({
	initialize: function(opts) {
		if (config.user == null)
			app_router.navigate(config.loginURL, true);
		else
			ListViewProtected.__super__.initialize.apply(this, arguments);
	}

});