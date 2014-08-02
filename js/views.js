var UniversityListView = ListView.extend({
	sql: null,
	minGPAWeighted: 2,
	maxGPAWeighted: 5,
	minGPAUnweighted: 2,
	maxGPAUnweighted: 4,
	universityType: null,
	events: {
		'change input': 'updateSQL',
		'change select': 'updateSQL',
		'click button': 'doSearch'
	},
	initialize: function(opts){
		this.updateContext();
		UniversityListView.__super__.initialize.apply(this, arguments);
	},
	
	/*
		Uses the filters to generate a SQL statement, which will be
		visible to the user (promotes transparency)
	*/
	updateSQL: function(){
		this.universityType = ($('#university_type').val() == "-1" ? null : $('#university_type').val());
		this.minGPAWeighted = $('#min_gpa_weighted').val();
		this.maxGPAWeighted = $('#max_gpa_weighted').val();
		this.minGPAUnweighted = $('#min_gpa_unweighted').val();
		this.maxGPAUnweighted = $('#max_gpa_unweighted').val();
		this.sql = "WHERE ";
		if(this.universityType)
			this.sql += "university_type='" + this.universityType + "' AND ";
					
		this.sql += "average_gpa_weighted >= " + this.minGPAUnweighted + " AND " +
				"average_gpa_weighted <= " + this.maxGPAWeighted + " AND ";
					
		this.sql += "average_gpa_unweighted >= " + this.minGPAWeighted + " AND " +
				"average_gpa_unweighted <= " + this.maxGPAUnweighted;
		this.updateContext();
	},
	
	render: function(){
		UniversityListView.__super__.render.apply(this, arguments);
		var that = this;
		$( "#slider_weighted").slider({
			range: true,
			min: 20,
			max: 50,
			values: [ parseInt(that.minGPAWeighted*10), parseInt(that.maxGPAWeighted*10) ],
			slide: function( event, ui ) {
				that.minGPAWeighted = ui.values[0]/10.0;
				that.maxGPAWeighted = ui.values[1]/10.0;
				that.updateSliderValues();
			}
		});
		$( "#slider_unweighted").slider({
			range: true,
			min: 20,
			max: 40,
			values: [ parseInt(that.minGPAUnweighted*10), parseInt(that.maxGPAUnweighted*10) ],
			slide: function( event, ui ) {
				that.minGPAUnweighted = ui.values[0]/10.0;
				that.maxGPAUnweighted = ui.values[1]/10.0;
				that.updateSliderValues();
			}
		});
		this.updateSliderValues();
	},
	updateSliderValues: function(){
		$("#min_gpa_weighted").val(this.minGPAWeighted);
		$("#max_gpa_weighted").val(this.maxGPAWeighted);
		$("#range_label_weighted").html(
			this.minGPAWeighted + " - " + this.maxGPAWeighted
		);
		
		$("#min_gpa_unweighted").val(this.minGPAUnweighted);
		$("#max_gpa_unweighted").val(this.maxGPAUnweighted).trigger('change');
		$("#range_label_unweighted").html(
			this.minGPAUnweighted + " - " + this.maxGPAUnweighted
		);
	},
	/*
		Adds user's filters to the context, so that they are
		remembered search to search
	*/
	updateContext: function(){
		$.extend(this.context, {
			universityType: this.universityType,
			maxGPAWeighted: this.maxGPAWeighted,
			minGPAWeighted: this.minGPAWeighted,
			maxGPAUnweighted: this.maxGPAUnweighted,
			minGPAUnweighted: this.minGPAUnweighted
		});
	},
	
	doSearch: function(e) {
		config.router.navigate("/universities/search/" + this.sql, true);
		e.preventDefault();
	},
	
	setFilter: function(filter) {
		this.filter = filter;
	}
	
});