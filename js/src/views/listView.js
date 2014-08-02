var ListView = BaseView.extend({
	collection: null,
	filter: null,
	initialize: function(opts) {
		if(!this._initialize(opts)) { return };
		this.showLoadingMessage();
		if (this.collection.length==0) {
			this.query();	
		}
		else {
			this.render();
		}
	},
	
    render: function() {
		this.evaluateContext({ list: this.collection.models });
        this.$el.html(this.template(this.context));
    },
	
	query: function(){
		var that = this;
		this.collection.fetch({
			data: {
				query: this.filter,
				page_size: 50
			},
			success: function(){
				that.render();
			}
		});
	}

});