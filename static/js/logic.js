let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let map = L.map('mapid', {
	center: [25, 0],
	zoom: 3,
	layers: [outdoors]
});

let stravaData = "https://raw.githubusercontent.com/mzabrisk/strava/main/strava_data.json"
d3.json(stravaData).then(function(data) {
    console.log(data)

    run = []

    for (i=0; i < 100; i++) {
        console.log(data.type[i])
        if (data.type[i] === 'Run') {
            run.push(data[i])


        }

    }
    console.log(run)
    console.log(data.end_latlng)


    // L.geoJson(data).addTo(map)
})