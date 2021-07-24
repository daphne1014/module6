let cityFormEl=document.querySelector("#city-search");
let cityInputEl=document.querySelector("#city");
let currentWeatherEl = document.querySelector("#current");
let forecastWeatherEl= document.querySelector("#forecast");
let citySearchTerm=document.querySelector("#city-search-term");


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
    let apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=9c76c7ef37d1bba54f751bc76aafae7e&units=metric";

    // make a request to the url
    fetch(apiUrlCurrent).then(function (response) {
        response.json().then(function (data) {
           displayCurrentWeather(data,cityName);
        });
    });
};

let getForecast = function(cityName){
    apiUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=9c76c7ef37d1bba54f751bc76aafae7e&units=metric";
    fetch(apiUrlForcast).then(function (response) {
        response.json().then(function (data) {
            displayForecastWeather(data,cityName);
        });
    });
};

let displayCurrentWeather = function(weatherCurrent, searchTerm){
    console.log(weatherCurrent);
    console.log(searchTerm);
    //clear old content
    // currentWeatherEl.textContent="";
    // forecastWeatherEl.textContent="";
    citySearchTerm.textContent=searchTerm;
    // let currentDate = weatherCurrent.main.;
    let currentTemperature = weatherCurrent.main.temp;
    let currentHumidity = weatherCurrent.main.humidity;
    let currentPressure = weatherCurrent.main.pressure;
    $("#current-temperature").text("Temperature: " +currentTemperature+" °C");
    $("#current-humidity").text("Humidity: "+currentHumidity +"%");
    $("#current-pressure").text("Pressure "+currentPressure + " Pa");
}
let displayForecastWeather=function(weatherForecast,searchTerm){
    console.log(weatherForecast);
    console.log(searchTerm);

    // let forecastDate=;
    // let forecastIcon=;
    // let forecastTemperature=;
    // let forecastHumidity=;
}

