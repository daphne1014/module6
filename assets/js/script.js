let currentDate = moment().format("[(] MM [/] DD [/] YYYY[)]");
let city = "";
let cityList = [];

$("#submit").click(function () {
    event.preventDefault();
    let city = $("#city").val();
    if (city) {
        displayWeather(city)
        historyBtn(city)
    }
});


let displayWeather = function (city) {
    let apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9c76c7ef37d1bba54f751bc76aafae7e&units=metric";
    fetch(apiUrlCurrent)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (response) {
                        let currentTemperature = response.main.temp;
                        let currentHumidity = response.main.humidity;
                        let currentWind = response.wind.speed;
                        let icon = $("<img>");
                        icon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
                        icon.attr("width", 50);
                        $("#today-icon").empty(icon)
                        $("#today-date").empty(currentDate);
                        $("#today-icon").append(icon)
                        $("#city-search-term").text(city)
                        $("#today-date").append(currentDate);
                        $("#current-temperature").text("Temperature: " + currentTemperature + " °C");
                        $("#current-humidity").text("Humidity: " + currentHumidity + "%");
                        $("#current-wind").text("Wind Speed: " + currentWind + "m/s");
                        cityList.push(city);
                        localStorage.setItem('city', JSON.stringify(cityList));
                        let apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?appid=9c76c7ef37d1bba54f751bc76aafae7e&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minutely,hourly,alerts&units=metric";
                        fetch(apiUrlUv)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (response) {
                                //write DOM elements here
                                console.log(response);
                                let currentUv = response.current.uvi;
                                $("#current-uv-title").text("UV Index: ");
                                if (currentUv <= 3) {
                                    $("#current-uv").addClass("badge badge-success")
                                } else if (currentUv > 3) {
                                    $("#current-uv").addClass("badge badge-yellow")
                                } else if (currentUv > 6) {
                                    $("#current-uv").addClass("badge badge-orange")
                                } else {
                                    $("#current-uv").addClass("badge badge-red")
                                }
                                $("#current-uv").text(currentUv);
                                $("#forecast-title").text("5-day Forecast");
                                let dailyData = response.daily;
                                console.log(dailyData[0])
                                $("#forecast-data").empty();
                                for (i = 0; i < 5; i++) {
                                    let div = $("<div>");
                                    div.addClass("col-lg-2 col-12");
                                    let h3 = $("<h3>");
                                    h3.text(moment().add((1 + i), 'days').format("MM [/] DD"));
                                    let icon = $("<img>");
                                    icon.attr("src", "https://openweathermap.org/img/wn/" + dailyData[i].weather[0].icon + "@2x.png");
                                    icon.attr("width", 80);
                                    div.append(h3);
                                    div.append(icon);
                                    let futureTemperature = $('<p>')
                                    let futureWind = $('<p>')
                                    let futureHumidity = $('<p>');
                                    futureHumidity.addClass("col-12");
                                    futureTemperature.addClass("col-12");
                                    futureWind.addClass("col-12");
                                    futureTemperature.text("Temperature: " + dailyData[i].temp.day + " °C");
                                    futureHumidity.text("Humidity: " + dailyData[i].humidity + "%");
                                    futureWind.text("Wind Speed: " + dailyData[i].wind_speed + "m/s");
                                    div.append(futureTemperature);
                                    div.append(futureHumidity);
                                    div.append(futureWind);
                                    $("#forecast-data").append(div);
                                   
                                }
                            })
                    })
            }
        })
};
let historyBtn = function (city) {
    if (cityList.length != null) {
        btnCity = $('<button>');
        btnCity.addClass('btn btn-success mt-2 mb-2 btn-block');
        btnCity.text(city);
        btnCity.on('click', function (event) {
            event.preventDefault();
            displayWeather(city);
        })
        $('#search-menu').append(btnCity);
    }
}

cityList = JSON.parse(localStorage.getItem('city')) || [];
for (i = 0; i < cityList.length; i++) {
    historyBtn(cityList[i]);
};
