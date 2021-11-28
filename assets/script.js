// setting global var
const apiKey = "6cc3bdc3df946f3e2c80090de1f599ba";
var searchButton = document.querySelector("#search-btn");

// empty array to store repo
var searchArr = [];
var searchArrTwo = [];

// empty array for search history
cityArr = [];

// search by city
async function getCityDetails(event) {
event.preventDefault();
var searchInput = $("#search-input").val();
console.log(searchInput, "searchInput");
try {
    const cityWeatherRes = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
    );
    console.log("citywweatherres", cityWeatherRes);
    searchArr = cityWeatherRes.data;
    cityArr.push(cityWeatherRes.data);
} catch (err) {
    // handle error
    console.log(err);
}

  //  clear search input
$("#forecast-form")[0].reset();
getMoreDetails();
  // save into local
saveText();
}

// second api to get uv index, current date
async function getMoreDetails() {
try {
    const cityWeatherResTwo = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${searchArr.coord.lat}&lon=${searchArr.coord.lon}&units=imperial&appid=${apiKey}`
    );
    console.log("citywweatherrestwo", cityWeatherResTwo);
    searchArrTwo = cityWeatherResTwo.data;
} catch (err) {
    // handle error
    console.log(err);
}
    displayForecast();
}

// color UV index
var uvColor = function() {
    var UVUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=${searchArr.coord.lat}&lon=${searchArr.coord.lon}&units=imperial&appid=${apiKey}"
    fetch(UVUrl).then(function(response) {
        var uvIndex = parseInt(response.value);
        var uvBox = document.getElementById(".uv-area");

        uvBox.text("UV Index: " + response.value);

        if (uvIndex > 0 && uvIndex <= 2.99) {
            uvBox.addClass("low");
        }
        else if (uvIndex >= 3 && uvIndex <= 5.99) {
            uvBox.addClass("moderate");
        }
        else {
            uvBox.addClass("high");
        }
    })
};

uvColor();


// displays and appends city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index into main-forecast containter

function displayForecast() {
var mainForcastDIV = document.querySelector("#main-forecast");

var weatherIconElement = document.createElement("img");
var cityNameElement = document.createElement("h1");
var dateElement = new Date().toISOString().slice(0, 10);
document.createElement("h2");
var tempElement = document.createElement("p");
var humidElement = document.createElement("p");
var windElement = document.createElement("p");
var uvElement = document.createElement("p");

cityNameElement.innerText = `${searchArr.name}`;
tempElement.innerText = "Temperature: " + `${searchArr.main.temp}` + "°F";
humidElement.innerText = "Humidity: " + `${searchArr.main.humidity}` + "%";
windElement.innerText =
    "Wind Speed: " + `${searchArr.wind.speed}` + " miles/hour";
uvElement.innerText = "UV Index: " + `${searchArrTwo.current.uvi}`;

mainForcastDIV.append(
    cityNameElement,
    dateElement,
    tempElement,
    humidElement,
    windElement,
    uvElement
);
}

// saves search history cities in local storage

function saveText() {
sessionStorage.setItem("search-histories", JSON.stringify(cityArr));
}

function loadHistory() {
cityArr.forEach(function (index) { });
var savedTexts = sessionStorage.getItem('texts');
if(!savedTexts) {
        return false;
    }

    savedTexts = JSON.parse(savedTexts);
    console.log(savedTexts, "this is savedTexts");
    textArr = savedTexts;
    loadStorageTexts();
}
