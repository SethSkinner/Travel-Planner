var state = "al"
var newCitySearch = ''
$(document).ready(function(){
$('select').material_select();
})
// Getting data from search bar(Need to find a way to pull this out and put in queryURL)
$(document).keypress(function (e){
    if (e.which == 13) {
        var citySearchEl = $("#citySearchEl").val();
        newCitySearch = citySearchEl;
        getData()
      console.log(citySearchEl)
    }
})
console.log(citySearchEl)
function getData(){
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${newCitySearch}&appid=007c688e86824172fcd3437ec768284b`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        // console.log(response)
        lat = response.city.coord.lat;
        // console.log(futureLat)
        lon = response.city.coord.lon;
    
        getRestaurantData(lat, lon);
        getWeather(lat, lon);
        positionMap(lat, lon);
        getCoronavirus();
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
                var resData = $('#resData')
                var rest = restaurants[i].restaurant;
                var resDiv = $('<div>');
                var p1 = $('<p>').text('name: ' + rest.name);
                var p2 = $('<p>').text('food type: ' + rest.cuisines);
                var p3 = $('<p>').text('location: ' + rest.location.address);
                var p4 =$('<p>').text('phone #: ' + rest.phone_numbers);
                var p5 = $('<p>').text('open: ' + rest.timings);
                var p6 = $('<p>').text('rating: ' + rest.user_rating.aggregate_rating);
                var p7 = $('<p>').text('url: ' + rest.url);
                resData.append(resDiv);
                resDiv.append(p1);
                // Restaurant Name
                // console.log(rest.name);
                resDiv.append(p2);
                // rest food type
                // console.log(rest.cuisines);
                resDiv.append(p3);
                // Address
                // console.log(rest.location.address);
                resDiv.append(p4);
                // phone
                // console.log(rest.phone_numbers);
                resDiv.append(p5);
                // time open
                // console.log(rest.timings);
                resDiv.append(p6);
                // rating
                // console.log(rest.user_rating.aggregate_rating);
                // photo url
                // console.log(rest.photos_url)
                // rest url
                resDiv.append(p7);
                // console.log(rest.url)
                resDiv.append('<hr>')
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
function getCoronavirus(){
    $.ajax({
        // State name must only be two letters and lower case!
        url: "http://covidtracking.com/api/v1/states/" + state + "/current.json",
        method: "GET"})
        .then(function(response){
            // console.log(response)
            // State
            response.state
            $("#coState").text("State" + response.state);
            // console.log(response.state) 
            // Current Positive Cases
            response.positive
            $("#coPos").text("Positive Cases=" + response.positive)
            // console.log(response.positive)
            // Positive Cases Increase
            response.positiveIncrease
            $("#coIncrease").text("Increased by " + response.positiveIncrease)
            // console.log(response.positiveIncrease)
            // Hospitalized Currently
            response.hospitalizedCurrently
            $("#coHospital").text("Currently in the hospital= " + response.hospitalizedCurrently)
            // console.log(response.hospitalizedCurrently)
            // Deaths
            response.death
            $("#coDeaths").text("Current Deaths= " + response.death)
            // console.log(response.death)
            
        })
}
// OPEN WEATHER API
function getWeather(lat, lon){
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=007c688e86824172fcd3437ec768284b",
    method: "GET"})
    .then(function(response){
        var days = 0; 
        
        //loops through data
        for(var i=0; i< response.list.length; i++){
            
            if(response.list[i].dt_txt.split(" ")[1] == "15:00:00")
            {
                //putting data onto the elements on the page in current day div
                var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                var month = response.list[i].dt_txt.split("-")[1];
                var year = response.list[i].dt_txt.split("-")[0];
                $("#" + days + "date").text(month + "/" + day + "/" + year); 
                var temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + days + "temps").text("Temp: " + temp + String.fromCharCode(176)+"F");
                $("#" + days + "humidities").text("Humidity: " + response.list[i].main.humidity);
                $("#" + days + "icons").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                days++; 
            }
        }
    })
}
// Mapquest API
window.onload = function() {
    getData();
} 