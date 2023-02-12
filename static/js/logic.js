// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.

let navigationNight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 4,
    layers: [outdoors]
  })

// Basemaps
let baseMaps = {
    "Streets": streets,
    "Night": navigationNight,
    "Outdoors": outdoors
  };
  
  // Layer groups
  let allRuns = new L.LayerGroup();
  let run2023 = new L.LayerGroup();
  let run2022 = new L.LayerGroup();
  let run2021 = new L.LayerGroup();
  let run2020 = new L.LayerGroup();
  let run2019 = new L.LayerGroup();
  let run2018 = new L.LayerGroup();
  let run2017 = new L.LayerGroup();
  let run2016 = new L.LayerGroup();
  let run2015 = new L.LayerGroup();
  let run2014 = new L.LayerGroup();
  let run2013 = new L.LayerGroup();
  
  //Overlays
  let overlays = {
    "All": allRuns,
    "2023": run2023,
    "2022": run2022,
    "2021": run2021,
    "2020": run2020,
    "2019": run2019,
    "2018": run2018,
    "2017": run2017,
    "2016": run2016,
    "2015": run2015,
    "2014": run2014,
    "2013": run2013
  };
  
  // allows turning on and off layers/overlays
  L.control.layers(baseMaps, overlays).addTo(map);

let stravaData = "https://raw.githubusercontent.com/mzabrisk/strava/main/strava_data2.json"
d3.json(stravaData).then(function(data) {
    console.log(data.features[4])

    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: .6,
          fillColor: getColor((feature.properties.total_elevation_gain*3.25)/(feature.properties.distance*3.25/5280)),
          color: "#000000",
          radius: ((feature.properties.distance)**(0.95))/3000,
          stroke: true,
          weight: 1
        };
      }

    function getColor(elevationGainPerMile) {
        // console.log(elevationGainPerMile)
        if (elevationGainPerMile >= 400) {
            return '#6C3483'
        }
        if (elevationGainPerMile >= 300) {
            return '#A93226'
        }
        if (elevationGainPerMile >= 200) {
            return '#AF601A'
        }
        if (elevationGainPerMile >= 100) {
            return '#F4D03F'
        }
        if (elevationGainPerMile < 100) {
            return '#28B463'
        }


    }


    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, feature.properties.distance)
        },
        style: styleInfo,

    }).addTo(allRuns)
    allRuns.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2023-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2024-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2023)
    // run2023.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2022-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2023-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2022)
    // run2022.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2021-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2022-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2021)
    // run2021.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2020-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2021-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2020)
    // run2020.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2019-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2020-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2019)
    // run2019.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2018-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2019-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2018)
    // run2018.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2017-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2018-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2017)
    // run2017.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2016-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2017-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2016)
    // run2016.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2015-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2016-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2015)
    // run2015.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2014-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2015-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2014)
    // run2014.addTo(map)

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if ((Date.parse(feature.properties.date) >= Date.parse('2013-01-01')) && (Date.parse(feature.properties.date) < Date.parse('2014-01-01'))) {
                return L.circle(latlng, feature.properties.distance)
            }
        },
        style: styleInfo,

    }).addTo(run2013)
    // run2013.addTo(map)

      // Here we create a legend control object.
let legend = L.control({
    position: "bottomleft"
  });
  
  // Then add all the details for the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
  
    const magnitudes = [ , 0, 100, 200, 300, 400];
    const colors = [ ,
      '#28B463',
      '#F4D03F',
      '#AF601A',
      '#A93226',
      '#6C3483'
    ];
  
  
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        (colors[i] ? "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+") : '<h4>Gain(ft)/Mile</h4>');
      }
      return div;
    };
  
    // Finally, we our legend to the map.
    legend.addTo(map);

})