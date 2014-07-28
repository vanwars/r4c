var BaseView = Backbone.View.extend({
	templateName: null,
	initialize: function(opts) {
		$.extend(this, opts);
		this.template = _.template(config.templates[this.templateName]);
		this.render();
	},
    render: function() {
		this.$el.empty().append(this.template);
    },
	showLoadingMessage: function(){
		$(this.el).html($('<div class="fa fa-refresh fa-spin loading"></div>'));
	}

});