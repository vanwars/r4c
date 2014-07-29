var BaseView = Backbone.View.extend({
	templateName: null,
	context: {},
	restricted: false,
	initialize: function(opts) {
		if(!this._initialize(opts)) { return };
		this.render();
	},
	
	_initialize: function(opts){
		opts = opts || {};
		$.extend(this, opts);
		//check to see if
		if(!this.isAuthenticated()) {
			return false;
		}
		this.template = _.template(config.templates[this.templateName]);
		return true;
	},
	
    render: function() {
		this.$el.empty().append(this.template);
    },
	
	showLoadingMessage: function(){
		$(this.el).html($('<div class="fa fa-circle-o-notch fa-spin loading"></div>'));
	},
	
	evaluateContext: function(opts) {
		opts = opts || {};
		$.extend(this.context, opts);
		if (config.user)
			$.extend(this.context, { user: config.user });
		
		//if any of the context data are functions, evaluate them:
		for (key in this.context) {
			try {
				this.context[key] = this.context[key]();
			} catch(e) {
				// silent: keep status quo
			}
		}
	},
	
	isAuthenticated: function(){
		if (config.user == null && this.restricted) {
			config.router.navigate(config.loginURL, true);
			return false;
		}
		return true;
	}

});