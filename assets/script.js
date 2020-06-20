var state = "al"

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + "birmingham" + "&appid=007c688e86824172fcd3437ec768284b",
    method: "GET"})
    .then(function(response){
        console.log(response)
    })
    
// COVID TRACKING API
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
// OPEN WEATHER API
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + "birmingham" + "&appid=007c688e86824172fcd3437ec768284b",
    method: "GET"})
    .then(function(response){
        console.log(response)
    })

// Mapquest API
window.onload = function() {
    L.mapquest.key = 'QqtOgjcrFlsn4oZcILnGeOr0v21coXU6';

    var map = L.mapquest.map('map', {
      center: [40.7128, -74.0059],
      layers: L.mapquest.tileLayer('map'),
      zoom: 13
    });

    L.mapquest.directions().route({
      start: 'Nashville, TN',
      end: 'Birmingham, AL'
    });
  }

$.ajax({
    url: "https://developers.zomato.com/api/v2.1/search?entity_id=birmingham&entity_type=city&count=5&radius=8050&sort=rating",
    method: "GET",
    headers: {
        "user-key": "17ef7ae8c46d3f11647c7c1eca3bf00e"
    } })
    .then(function(response){
        console.log(response)
        console.log(response.restaurants[0])
    })

    // THINGS WE WILL NEED. A FUNCTION THAT CAN GET THE LAT AND LON FOR OUR SEARCH CITY TO PLUG IN TO AJAX CALLS.