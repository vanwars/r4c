var ListView = BaseView.extend({
	events: {},
	collection: null,
	filter: null,
	initialize: function(opts) {
		$.extend(this, opts);
		var that = this;
		this.template = _.template(config.templates[this.templateName]);
		this.showLoadingMessage();
		if (this.collection.length==0) {
			this.collection.fetch({
				data: {
					query: this.filter	
				},
				success: function(){
					that.render();
				}
			});
		}
		else {
			this.render();
		}
		
	},
	
    render: function() {
		var context = { list: this.collection.models };
		$.extend(context, this.extras);
        this.$el.html(this.template(context));
    }

});