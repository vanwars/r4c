var DetailView = BaseView.extend({
	Type: null,
	id: null,
	model: null,
	initialize: function(opts) {
		$.extend(this, opts);
		this.template = _.template(config.templates[this.templateName]);
		this.showLoadingMessage();
		this.initModel();
	},
	initModel: function(){
		var that = this;
		if(this.id)
			this.model = new this.Type({ id: this.id });
		else
			this.model = new this.Type();	
		this.model.fetch({data: {format: "json"}, success: function(){
			that.render();
		}});	
	},

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
	
});