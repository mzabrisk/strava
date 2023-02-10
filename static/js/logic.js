

let stravaData = "https://raw.githubusercontent.com/mzabrisk/strava/6c98d018412ad4c78b088f94c55b84b74cd83013/strava_data.json"
d3.json(stravaData).then(function(data) {
    console.log(data)
})