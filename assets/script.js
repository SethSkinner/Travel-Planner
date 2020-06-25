var newCitySearch = ''

$(document).ready(function(){
$('select').material_select();
})
// Getting data from search bar.
$(document).keypress(function (e){
    if (e.which == 13) {
        var citySearchEl = $("#citySearchEl").val();
        newCitySearch = citySearchEl;
        getData()
    }
})
console.log(citySearchEl)
function getData(){
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${newCitySearch}&appid=007c688e86824172fcd3437ec768284b`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        lat = response.city.coord.lat;
        lon = response.city.coord.lon;
    
        getRestaurantData(lat, lon);
        getWeather(lat, lon);
        positionMap(lat, lon);
        getCoronavirus(lat, lon);
    })
}
// Restaurant API
function getRestaurantData(lat, lon){
    
     console.log("lat=" + lat + " - lon=" + lon);
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?count=5&lat=" + lat + "&lon=" + lon + "&radius=8050&sort=rating:",
        method: "GET",
        headers: {
            "user-key": "17ef7ae8c46d3f11647c7c1eca3bf00e"
        } 
    })
        .then(function(response){
        
            var restaurants = response.restaurants;
            var resData = $('#resData')
            resData.empty()
            for(i = 0; i < restaurants.length; i++){
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
                resDiv.append(p2);
                resDiv.append(p3);
                resDiv.append(p4);
                resDiv.append(p5);
                resDiv.append(p6);
                resDiv.append(p7);
                resDiv.append('<hr>')
            }
        })
}
//function to clear out all of the data on the page to be reset
/*$( "#target" ).click(function clear(){
    var appendeddiv = append
    var append = 'div id="map" style="width: 100%; height: 530px;"></div>'
    $('#0date').empty();
    $('#1date').empty();
    $('#2date').empty();
    $('#3date').empty();
    $('#4date').empty();
    $('#0icons').attr('src', '');
    $('#1icons').attr('src', '');
    $('#2icons').attr('src', '');
    $('#3icons').attr('src', '');
    $('#4icons').attr('src', '');
    $('#0temps').empty();
    $('#1temps').empty();
    $('#2temps').empty();
    $('#3temps').empty();
    $('#4temps').empty();
    $('#0humidities').empty();
    $('#1humidities').empty();
    $('#2humidities').empty();
    $('#3humidities').empty();
    $('#4humidities').empty();
    $('#map').empty();
    $('#resData').empty();
    $('#coState').empty();
    $('#coPos').empty();
    $('#coIncrease').empty();
    $('#coHospital').empty();
    $('#coDeaths').empty();
});*/
// MapQuest API
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
function getCoronavirus(lat, lon){
    var queryUrl = "http://www.mapquestapi.com/geocoding/v1/reverse?key=QqtOgjcrFlsn4oZcILnGeOr0v21coXU6&location="+ lat+ "," + lon + "&includeRoadMetadata=true&includeNearestIntersection=true"
    $.ajax({
        url: queryUrl ,
        method: "GET"})
        .then(function(res){
            var covidState = res.results[0].locations[0].adminArea3.toLowerCase()
    $.ajax({
        url: "http://covidtracking.com/api/v1/states/" + covidState + "/current.json",
        method: "GET"})
        .then(function(response){
            // State
            response.state
            $("#coState").text("     State: " + response.state);
            // Current Positive Cases
            response.positive
            $("#coPos").text("     Positive Cases: " + response.positive);
            // Positive Cases Increase
            response.positiveIncrease
            $("#coIncrease").text("     Increased by: " + response.positiveIncrease);
            // Hospitalized Currently
            response.hospitalizedCurrently
            $("#coHospital").text("     Currently in the hospital: " + response.hospitalizedCurrently);
            // Deaths
            response.death
            $("#coDeaths").text("     Current Deaths: " + response.death)
        })
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
                //putting data onto the elements on the page in 5 day divs
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
// window.onload = function() {
//     getData();
// } 