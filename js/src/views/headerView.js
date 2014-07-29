var HeaderView = BaseView.extend({
	anonymousTemplateName: null,
	loggedInTemplateName: null,
	user: null,
	initialize: function(opts) {
		$.extend(this, opts);
		this.render();
	},
    render: function() {
		this.setTemplate();
		this.evaluateContext();
		this.$el.html(this.template(this.context));
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