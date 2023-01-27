var cities = [];

var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.ariaValueMax.trim();
    if(city) {
        getCityWeather(city);
        get5day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please Enter A City");
    }
    saveSearch ();
    pastSearchButtonEl(city);
}

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city) {
    var APIKey = "69fe1c69989ab6543e8a01cd4fed4c66"
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}'
}