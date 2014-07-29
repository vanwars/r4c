var DetailView = BaseView.extend({
	model: null,
	initialize: function(opts) {
		opts = opts || {};
		$.extend(this, opts);
		if (opts.model == null) {
			alert("you must define the model attribute when you're creating a DetailView.");
			return;
		}
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
		var context = {};
		$.extend(context, this.model.toJSON());
		$.extend(context, this.extras);
        this.$el.html(this.template(context));
        return this;
    }
	
});