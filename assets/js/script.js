let cityFormEl=document.querySelector("#city-search");
let cityInputEl=document.querySelector("#city");
let currentWeatherEl = document.querySelector("#current");
let forecastWeatherEl= document.querySelector("#forecast");

let searchHandler = function(event){
    event.preventDefault();
    let cityName = cityInputEl.value.trim();
    if (cityName){
        getCurrentWeather(cityName);
        getForecast(cityName);
        cityInputEl.value="";
    } else{
        alert("Please enter a city name");
    }
    console.log(event);
};

cityFormEl.addEventListener("submit",searchHandler);

let getCurrentWeather = function (cityName) {
    let apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=9c76c7ef37d1bba54f751bc76aafae7e";

    // make a request to the url
    fetch(apiUrlCurrent).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

let getForecast = function(cityName){
    apiUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=9c76c7ef37d1bba54f751bc76aafae7e";
    fetch(apiUrlForcast).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

getCurrentWeather("London");
getForecast("London");