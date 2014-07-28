var LoginView = BaseView.extend({
	
	events: {
        "click .login" : "checkCredentials"
    },
	initialize: function(opts) {
		$.extend(this, opts);
		var that = this;
		this.template = _.template(config.templates[this.templateName]);
		this.showLoadingMessage();
		this.render();
	},
	
    render: function() {
		if (config.user)
			this.$el.html("You are already logged in");
		else
			this.$el.html(this.template());
		
    },
	
	checkCredentials: function(evt){
		var that = this;
		this.collection.fetch({
			data: {
				query: "WHERE username='" + $('#username').val() +
						"' and password='" + $('#password').val() + "'"
			}, success: function(response){
				if(response.length ==1) {
					config.user = that.collection.at(0);
					new HeaderView({
						el: '#menu',
						loggedInTemplateName: 'MenuLoggedIn',
						anonymousTemplateName: 'AnonymousMenu',
						user: config.user
					});
					app_router.navigate("/", true);
				}
				else {
					app.utils.showAlert(
						'Not found:',
						'No username / password matched what you typed in',
						'alert-warning'
					);
				}
			}
		});
		evt.preventDefault();
		
	}

});