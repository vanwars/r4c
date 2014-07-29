var LoginView = BaseView.extend({
	field_username: 'username',
	field_password: 'password',
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
				query: "WHERE " + that.field_username + "='" +
						$('#' + that.field_username).val() +
						"' and " + that.field_password + "='" +
						$('#' + that.field_password).val() + "'"
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