var DetailView = BaseView.extend({
	model: null,
	initialize: function(opts) {
		$.extend(this, opts);
		this.template = _.template(config.templates[this.templateName]);
		this.showLoadingMessage();
		this.initModel();
	},
	initModel: function(){
		if (this.model) {
			that = this;
			this.model.fetch({data: {format: "json"}, success: function(){
				that.render();
			}});
		}
		else {
			this.render();
		}
	},

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
	
});