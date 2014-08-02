var University = Model.extend({
	urlRoot: 'http://dev.localground.org/api/0/forms/1/data/'
});

var User = Model.extend({
	classes: null,
	gpa_unweighted: null,
	urlRoot: 'http://dev.localground.org/api/0/forms/2/data/',
	fetchClasses: function(){
		var that = this;
		this.classes = new Classes();
		this.classes.fetch({
			data: {
				query: 'where user_id = ' + that.get("id")
			}, success: function(reponse){
				that.gpa_unweighted = that.classes.average("points_un_weighted");
				//alert(that.gpa_unweighted);
			}
		});
	}
});

var Class = Model.extend({
	urlRoot: 'http://dev.localground.org/api/0/forms/3/data/'
});