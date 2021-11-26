var getWeather = function () {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
    fetch(weatherUrl).then(function(response){
        if (response.ok) {
            console.log("response ok");
        }
    })
}