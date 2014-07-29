var ListView = BaseView.extend({
	collection: null,
	filter: null,
	initialize: function(opts) {
		var that = this;
		if(!this._initialize(opts)) { return };
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
		this.evaluateContext({ list: this.collection.models });
        this.$el.html(this.template(this.context));
    }

});