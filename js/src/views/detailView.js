var DetailView = BaseView.extend({
	model: null,
	initialize: function(opts) {
		if(!this._initialize(opts)) { return };
		if (opts.model == null) {
			alert("you must define the model attribute when you're creating a DetailView.");
			return;
		}
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
		this.evaluateContext(this.model.toJSON());
        this.$el.html(this.template(this.context));
    }
	
});