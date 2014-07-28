var LoginView = BaseView.extend({
	events: {},
	collection: null,
	initialize: function(opts) {
		$.extend(this, opts);
		var that = this;
		this.template = _.template(config.templates[this.templateName]);
		this.showLoadingMessage();
		this.collection.fetch({success: function(){
			that.render();
		}});
	},
	
    render: function() {
		this.$el.html(this.template({ list: this.collection.models }));
    }

});