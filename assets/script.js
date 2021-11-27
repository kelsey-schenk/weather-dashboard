var cityInput = document.querySelector("#city-name");
var APIkey = "6cc3bdc3df946f3e2c80090de1f599ba";

var getWeather = function () {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid" + APIkey;
    fetch(weatherUrl)
        .then(function(response){
        if (response.ok) {
            console.log("response ok");
        }
    })
};

if (cityInput) {
    getWeather();
} else {
    alert('Please enter a valid city');
}

getWeather();

