var state = "al"
var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + "birmingham" + "&appid=007c688e86824172fcd3437ec768284b"

function getData(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        // console.log(response)
        lat = response.city.coord.lat;
        // console.log(futureLat)
        lon = response.city.coord.lon;
        // console.log(futureLon)
        // console.log("https://api.openweathermap.org/data/2.5/uvi?appid=505bc59551e545ee228f440eb0aa0ff2"+"&lat="+lat + "&lon=" + lon);
        getRestaurantData(lat, lon);
        getWeather(lat, lon);
        positionMap(lat, lon);
        // call more data functions, passing lat and lon from this callback
    })
}

// all the functions
function getRestaurantData(lat, lon){
    // ajax
    console.log("lat=" + lat + " - lon=" + lon);
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?count=5&lat=" + lat + "&lon=" + lon + "&radius=8050&sort=rating:",
        method: "GET",
        headers: {
            "user-key": "17ef7ae8c46d3f11647c7c1eca3bf00e"
        } 
    })
        .then(function(response){
            
            // console.log(response)
            var restaurants = response.restaurants;
    
            for(i = 0; i < restaurants.length; i++){
      
                var rest = restaurants[i].restaurant;
                // Restaurant Name
                console.log(rest.name);
                // rest food type
                console.log(rest.cuisines);
                // Address
                console.log(rest.location.address);
                // phone
                console.log(rest.phone_numbers);
                // time open
                console.log(rest.timings);
                // rating
                console.log(rest.user_rating.aggregate_rating);
                // photo url
                console.log(rest.photos_url)
                // rest url
                console.log(rest.url)
            }
        })
}

function positionMap(lat, lon){
    L.mapquest.key = 'QqtOgjcrFlsn4oZcILnGeOr0v21coXU6';
    var map = L.mapquest.map('map', {
        center: [40.7128, -74.0059],
        layers: L.mapquest.tileLayer('map'),
        zoom: 13
      });
  
      L.mapquest.directions().route({
        start: 'Nashville, TN',
        end: [lat,lon]
      });
}

// COVID TRACKING API
function getCoronavirus(state){
    $.ajax({
        // State name must only be two letters and lower case!
        url: "http://covidtracking.com/api/v1/states/" + state + "/current.json",
        method: "GET"})
        .then(function(response){
            console.log(response)
            // State
            response.state
            console.log(response.state) 
            // Current Positive Cases
            response.positive
            console.log(response.positive)
            // Positive Cases Increase
            response.positiveIncrease
            console.log(response.positiveIncrease)
            // Hospitalized Currently
            response.hospitalizedCurrently
            console.log(response.hospitalizedCurrently)
            // Deaths
            response.death
            console.log(response.death)
            
        })
}
// OPEN WEATHER API
function getWeather(lat, lon){
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=007c688e86824172fcd3437ec768284b",
    method: "GET"})
    .then(function(response){
        console.log(response)
    })
}
// Mapquest API

window.onload = function() {
    getData();
}
