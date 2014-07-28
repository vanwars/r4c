var HeaderView = Backbone.View.extend({
	anonymousTemplateName: null,
	loggedInTemplateName: null,
	user: null,
	initialize: function(opts) {
		$.extend(this, opts);
		this.render();
	},
    render: function() {
		this.setTemplate();
		if (this.user)
			this.$el.html(this.template(this.user.toJSON()));
		else
			this.$el.html(this.template);
    },
	showLoadingMessage: function(){
		$(this.el).html($('<div class="fa fa-refresh fa-spin loading"></div>'));
	},
	setTemplate: function(){
		if (this.user)
			this.template = _.template(config.templates[this.loggedInTemplateName]);
		else
			this.template = _.template(config.templates[this.anonymousTemplateName]);	
	}

});