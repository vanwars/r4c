var MapView = ListView.extend({
	map: null,
	markers: [],
    render: function() {
		
		//alert($(window).height());
		this.evaluateContext({ list: this.collection.models });
        this.$el.html(this.template(this.context));
		$('#map_canvas').css({
			width: '100%',
			height: $(window).height() - 104,
			'max-width': 'none !important'
		});
		this.renderMap();
		this.renderMarkers();
    },
	
	renderMap: function(){
		var mapOptions = {
			scrollwheel: false,
			streetViewControl: true,
			scaleControl: true,
			panControl: false,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				position: google.maps.ControlPosition.TOP_LEFT
			},
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			styles: [{
				featureType: "poi.school",
				elementType: "geometry", 
				stylers: [ { saturation: -79 }, { lightness: 75 } ]
			}],
			zoom: 6,
			center: new google.maps.LatLng(37.653141,-120.9884361)
			
		};
		this.map = new google.maps.Map(document.getElementById("map_canvas"),
									mapOptions);
	},
	renderMarkers: function(){
		var that = this;
		this.markers = [];
		this.collection.each(function(model){
			if (model.get("geometry")) {
				var geoJSON = model.get("geometry");
				var latLng = new google.maps.LatLng(geoJSON.coordinates[1], geoJSON.coordinates[0]);
				var marker = new google.maps.Marker({
					map: that.map,
					position: latLng,
					id: model.get("id")
				});
				google.maps.event.addListener(marker, 'click', function() {
					config.router.navigate("/universities/" + this.id, true);
				});
				that.markers.push(marker);
			}
		});
	}

});