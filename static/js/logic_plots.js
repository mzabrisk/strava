



// var stravaData = "https://raw.githubusercontent.com/mzabrisk/strava/main/static/data/strava_data2.json"
d3.json(stravaData).then(function(data) {
    console.log(data.features)

    var dataObject = {
        'year': {
            '2013': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2014': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2015': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2016': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2017': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2018': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2019': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2020': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2021': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2022': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
            '2023': {'count': 0, 'miles': 0, 'elevation': 0, 'moving_time': 0, 'elapsed_time':0, 'gainPerMile': 0, 'avgDistance': 0, 'avgPace': 0, 'mvmtRatio': 0 },
        }
    }

    for (var i=0; i<data.features.length; i++) {

        var years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
       
        let d = new Date(data.features[i].properties.date)

        let year = d.getFullYear()
        
        if ((Date.parse(data.features[i].properties.date) >= Date.parse(`${year}-01-01`)) && (Date.parse(data.features[i].properties.date) < Date.parse(`${year+1}-01-01`))) {
            
            for (var j=0; j<years.length; j++) {
                var yearVar = dataObject.year[years[j]]
                
                if (year === years[j]) {
                    dataObject.year[years[j]].count += 1
                    dataObject.year[years[j]].miles += data.features[i].properties.distance*3.28084/5280
                    dataObject.year[years[j]].elevation += data.features[i].properties.total_elevation_gain*3.28084
                    dataObject.year[years[j]].elapsed_time += data.features[i].properties.elapsed_time/60/60
                    dataObject.year[years[j]].moving_time += data.features[i].properties.moving_time/60/60

                }
            }}


        }
        console.log(dataObject)
    
        var milesArray = []
        var elevationArray = []
        var countArray = []
        var timeElapsedArray = []
        var timeMovingArray = []
        var avgDistanceArray = []
        var mvmtRatioArray = []
        var avgPaceArray = []
        var gainPerMileArray = []

        for (var i=0; i<years.length; i++) {
            milesArray.push(dataObject.year[years[i]].miles)
            elevationArray.push(dataObject.year[years[i]].elevation)
            countArray.push(dataObject.year[years[i]].count)
            timeElapsedArray.push(dataObject.year[years[i]].elapsed_time)
            timeMovingArray.push(dataObject.year[years[i]].moving_time)
            avgDistanceArray.push(milesArray[i]/countArray[i])
            mvmtRatioArray.push(timeMovingArray[i]/timeElapsedArray[i])
            avgPaceArray.push((timeElapsedArray[i]*60)/milesArray[i])
            gainPerMileArray.push(elevationArray[i]/milesArray[i])
        }

        console.log(milesArray)
        console.log(elevationArray)
        console.log(countArray)
        console.log(timeElapsedArray)
        console.log(timeMovingArray)
        console.log(avgDistanceArray)
        console.log(mvmtRatioArray)
        console.log(avgPaceArray)
        console.log(gainPerMileArray)


    var colors = ['#89CFF0', '#0000FF', '#7393B3', '#088F8F', '#0096FF', '#5F9EA0', '	#0047AB', '#6495ED', '#00008B', '#6F8FAF', '#6082B6']

    
    // distance plot
    var milesData = [{
    y: milesArray,
    x: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    type: 'bar',
    orientation: 'v',
    marker: {
        color: colors,
        line: {
            color: 'black',
            width: 2
        }
    },
    }
    ];

    var milesLayout = {
    title: {
        text: "Total Mileage by Year",
        font: {
        color:'black'
        }
    },
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    yaxis: {
        color:'black',
        title: {text: 'Distance (miles)'}
    },
    xaxis: {
        color:'black',
        title: {text: 'Year'}
    }
    };

    Plotly.newPlot("plot-distance", milesData, milesLayout)

    //elevation plot
    var elevationData = [{
        y: elevationArray,
        x: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        type: 'bar',
        orientation: 'v',
        marker: {
            color: colors,
            line: {
                color: 'black',
                width: 2
            }
        },
        }];
    
        var elevationLayout = {
        title: {
            text: "Total Elevation by Year",
            font: {
            color:'black'
            }
        },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
            color:'black',
            title: {text: 'Elevation Gain (ft)'}
        },
        xaxis: {
            color:'black',
            title: {text: 'Year'}
        }};
    
        Plotly.newPlot("plot-elevation", elevationData, elevationLayout)

        //count plot
        var countData = [{
        y: countArray,
        x: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        type: 'bar',
        orientation: 'v',
        marker: {
            color: colors,
            line: {
                color: 'black',
                width: 2
            }
        },
        }];
    
        var countLayout = {
        title: {
            text: "Run Count by Year",
            font: {
            color:'black'
            }
        },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
            color:'black',
            title: {text: 'Runs (count)'}
        },
        xaxis: {
            color:'black',
            title: {text: 'Year'}
        }};
    
        Plotly.newPlot("plot-count", countData, countLayout)

        //time plot
        var timeDataMoving = {
            y: timeMovingArray,
            x: years,
            type: 'bar',
            orientation: 'v',
            name: 'moving_time',
            marker: {
                color: 'blue',
                line: {
                    color: 'black',
                    width: 2
                }
            },
            };

            var timeDataElapsed = {
                y: timeElapsedArray,
                x: years,
                type: 'bar',
                orientation: 'v',
                name: 'elapsed_time',
                marker: {
                    color: 'red',
                    line: {
                        color: 'black',
                        width: 2
                    }
                },
                };
        
            var countLayout = {
            title: {
                text: "Run Time by Year",
                font: {
                color:'black'
                }
            },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)',
            yaxis: {
                color:'black',
                title: {text: 'Run Time (hours)'}
            },
            xaxis: {
                color:'black',
                title: {text: 'Year'}
            }};
        
            Plotly.newPlot("plot-time", [timeDataMoving, timeDataElapsed], countLayout)

            //avgDist plot
            var avgDistData = [{
            y: avgDistanceArray,
            x: years,
            type: 'bar',
            orientation: 'v',
            marker: {
                color: colors,
                line: {
                    color: 'black',
                    width: 2
                }
            },
            }];
        
            var avgDistLayout = {
            title: {
                text: "Avg Run Distance by Year",
                font: {
                color:'black'
                }
            },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)',
            yaxis: {
                color:'black',
                title: {text: 'Distance (miles))'}
            },
            xaxis: {
                color:'black',
                title: {text: 'Year'}
            }};
        
            Plotly.newPlot("plot-avg-distance", avgDistData, avgDistLayout)

            //gain per mile plot
            var gainMileData = [{
                y: gainPerMileArray,
                x: years,
                type: 'bar',
                orientation: 'v',
                marker: {
                    color: colors,
                    line: {
                        color: 'black',
                        width: 2
                    }
                },
                }];
            
                var gainMileLayout = {
                title: {
                    text: "Elevation Gained per Mile by Year",
                    font: {
                    color:'black'
                    }
                },
                paper_bgcolor:'rgba(0,0,0,0)',
                plot_bgcolor:'rgba(0,0,0,0)',
                yaxis: {
                    color:'black',
                    title: {text: 'Elevation gain (ft/mile)'}
                },
                xaxis: {
                    color:'black',
                    title: {text: 'Year'}
                }};
            
                Plotly.newPlot("plot-gain-mile", gainMileData, gainMileLayout)

                //mvmtRatio plot
            var mvmtRatioData = [{
                y: mvmtRatioArray,
                x: years,
                type: 'bar',
                orientation: 'v',
                marker: {
                    color: colors,
                    line: {
                        color: 'black',
                        width: 2
                    }
                },
                }];
            
                var mvmtRatioLayout = {
                title: {
                    text: "% Time Moving",
                    font: {
                    color:'black'
                    }
                },
                paper_bgcolor:'rgba(0,0,0,0)',
                plot_bgcolor:'rgba(0,0,0,0)',
                yaxis: {
                    color:'black',
                    title: {text: '% Time Moving (Moving Time/Elapsed Time'}
                },
                xaxis: {
                    color:'black',
                    title: {text: 'Year'}
                }};
            
                Plotly.newPlot("plot-mvmt-ratio", mvmtRatioData, mvmtRatioLayout)


    })

    

