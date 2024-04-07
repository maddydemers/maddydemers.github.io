async function loadData() {
    try {
        const response = await fetch('private/strava.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading data:', error.message);
    }
}

// Source: Leaflet
var map = L.map('map').setView([42.3736, -71.1097], 3);

// Source: Leaflet/OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

loadData().then(data => {
    if (data && data.start_latlng) {
        var markers = [];

        for (var key in data.start_latlng) {
            if (data.start_latlng.hasOwnProperty(key)) {
                var latLngString = data.start_latlng[key];
                var latLngArray = JSON.parse(latLngString);
                var lat = latLngArray[0];
                var lng = latLngArray[1];
                var latlng = [lat, lng];

                var type = data.type[key];
                var dist = data.distance_mi[key];
                var vert = data.total_elevation_gain_ft[key];
                var year = data.year[key];
                var month = data.month[key];
                dist = parseFloat(dist).toFixed(2); 
                vert = parseFloat(dist).toFixed(0); 

                // .bindPopup("<b>" + type + "</b><br>Date: " + month+ "/" + year+ "<br>Distance: " + dist + " mi" +"<br>Elevation Gain: " + vert + " ft");

                var marker = L.marker(latlng)
                    .addTo(map)
                    .bindPopup("<b>" + type)
                    .bindPopup("<b>" + type + "</b><br>Distance: " + dist + " mi" +"<br>Elevation Gain: " + vert + " ft");
                    marker.on('click', function(e) {
                        map.setView(e.latlng, 10); 
                    });

                markers.push(marker);
                console.log("Number of markers added:", markers.length);
            }
        }
    } else {
        console.error("Data is not properly defined or does not contain 'start_latlng' property.");
    }
});

