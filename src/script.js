function defaultCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(defaultCityWeather);
}

function locateCity() {
  navigator.geolocation.getCurrentPosition(locateCityWeather);
  function locateCityWeather(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(defaultCityWeather);
  }
}

function defaultCityWeather(response) {
  let currentCity = response.data.name;
  city.innerHTML = `${currentCity}`;
  let temp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  currentTimeDisplay.innerHTML = `${day} ${hours}:${minutes}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
}

function inputCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(inputCityWeather);
}

function inputCityWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  city.innerHTML = `${searchCityInput.value}`;
  currentTimeDisplay.innerHTML = `${day} ${hours}:${minutes} in your current location`;
  currentTempElement.innerHTML = `${temp}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
}

function tempToFahrenheit() {
  if (tempUnit.innerHTML === "ºC") {
    let currentTemp = currentTempElement.innerHTML;
    currentTemp = Number(currentTemp);
    currentTempElement.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
    let highTemp = highTempElement.innerHTML;
    highTemp = Number(highTemp);
    highTempElement.innerHTML = Math.round((highTemp * 9) / 5 + 32);
    let lowTemp = lowTempElement.innerHTML;
    lowTemp = Number(lowTemp);
    lowTempElement.innerHTML = Math.round((lowTemp * 9) / 5 + 32);
    tempUnit.innerHTML = "ºF";
  }
}

function tempToCelcius() {
  if (tempUnit.innerHTML === "ºF") {
    let currentTemp = currentTempElement.innerHTML;
    currentTemp = Number(currentTemp);
    currentTempElement.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
    let highTemp = highTempElement.innerHTML;
    highTemp = Number(highTemp);
    highTempElement.innerHTML = Math.round(((highTemp - 32) * 5) / 9);
    let lowTemp = lowTempElement.innerHTML;
    lowTemp = Number(lowTemp);
    lowTempElement.innerHTML = Math.round(((lowTemp - 32) * 5) / 9);
    tempUnit.innerHTML = "ºC";
  }
}

let apiKey = "c10c120febfbdbb2ecbedb567e2ec32d";

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTimeDisplay = document.querySelector("#current-time");
currentTimeDisplay.innerHTML = `${day} ${hours}:${minutes}`;

let city = document.querySelector("#city");
let searchCityForm = document.querySelector("#search-form");
let searchCityInput = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", inputCity);

let currentTempElement = document.querySelector("#current-temp");
let highTempElement = document.querySelector("#high-temp");
let lowTempElement = document.querySelector("#low-temp");

let tempUnit = document.querySelector("#temp-unit");

let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", locateCity);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", tempToFahrenheit);

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", tempToCelcius);

navigator.geolocation.getCurrentPosition(defaultCity);
