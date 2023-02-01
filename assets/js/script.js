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
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    get5Day(city);
    cities.unshift({
      city
    });
    cityInputEl.value = "";
  } else {
    alert("Please Enter A City");
  }
  saveSearch();
  pastSearch(city);
}

var saveSearch = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city) {
  var ApiKey = "69fe1c69989ab6543e8a01cd4fed4c66"
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${ApiKey}`

  fetch(apiURL)
    .then(function(response) {
      response.json().then(function(data) {
        displayWeather(data, city);
      });
    });
};

var displayWeather = function(weather, searchCity) {
  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = searchCity;

  var currentDate = document.createElement("span")
  currentDate.textContent = " (" + moment(weather.dt.value).format("MM, DD, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  var weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", 'https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png');
  citySearchInputEl.appendChild(weatherIcon);

  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + "°F";
  temperatureEl.classList = "list-group-item"

  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
  humidityEl.classList = "list-group-item"

  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
  windSpeedEl.classList = "list-group-item"

  weatherContainerEl.appendChild(temperatureEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windSpeedEl);
}

var get5Day = function(city) {
  var APIKey = "69fe1c69989ab6543e8a01cd4fed4c66"
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`

  fetch(apiURL)
    .then(function(response) {
      response.json().then(function(data) {
        display5Day(data);
      });
    });
};

var display5Day = function(weather) {
  forecastContainerEl.textContent = ""
  forecastTitle.textContent = "5-Day Forecast:";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2";

    var forecastDate = document.createElement("h5")
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("MM, DD, YYYY");
    forecastDate.classList = "card-header text-center"
    forecastEl.appendChild(forecastDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute("src", 'https://openweathermap.org/img/wn/${dailyForecasr.weather[0].icon}@2x.png');

    forecastEl.appendChild(weatherIcon);

    var forecastTempEl = document.createElement("span");
    forecastTempEl.classList = "card-body text-center";
    forecastTempEl.textContent = dailyForecast.main.temp + "°F";

    forecastEl.appendChild(forecastTempEl);

    var forecastHumidityEl = document.createElement("span");
    forecastHumidityEl.classList = "card-body text-center";
    forecastHumidityEl.textContent = dailyForecast.main.humidity + "%";

    forecastEl.appendChild(forecastHumidityEl);

    forecastContainerEl.appendChild(forecastEl);
  }
}

var pastSearch = function(pastSearch) {
  pastSearchEl = document.createElement("button");
  pastSearchEl.textConten = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city", pastSearch)
  pastSearchEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function(event) {
  var city = event.target.getAttribute("data-city")
  if (city) {
    getCityWeather(city);
    get5Day(city);
  }
}

cityFormEl.addEventListener("submit", formSubmitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);