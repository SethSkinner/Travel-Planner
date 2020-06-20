var state = "al"
$.ajax({
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
        // Positive Increase
        response.positiveIncrease
        console.log(response.positiveIncrease)
        // Hospitalized Currently
        response.hospitalizedCurrently
        console.log(response.hospitalizedCurrently)
        
    })

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + "birmingham" + "&appid=505bc59551e545ee228f440eb0aa0ff2",
    method: "GET"})
    .then(function(response){
        console.log(response)
    })
