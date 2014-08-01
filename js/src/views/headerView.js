var HeaderView = BaseView.extend({
	anonymousTemplateName: null,
	loggedInTemplateName: null,
	events: {
		'click .nav li > a': 'hideMenu'
	},
	initialize: function(opts) {
		$.extend(this, opts);
		this.render();
	},
	hideMenu: function(){
		/* For mobile view: menu doesn't close automatically */
		if($('.navbar-toggle').css('display') !='none'){
			$(".navbar-toggle").click();
		}
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
		if (config.user)
			this.template = _.template(config.templates[this.loggedInTemplateName]);
		else
			this.template = _.template(config.templates[this.anonymousTemplateName]);	
	}

});