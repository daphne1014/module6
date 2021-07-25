let currentDate = moment().format("[(] MM [/] DD [/] YYYY[)]");
let city = "";
let cityList = [];

$("#submit").click(function () {
    event.preventDefault();
    let city = $("#city").val();
    if (city) {
        displayWeather(city)
    }
});

let displayWeather = function (city) {
    let apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9c76c7ef37d1bba54f751bc76aafae7e&units=metric";
    fetch(apiUrlCurrent)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function(response) {
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
                    let apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?appid=9c76c7ef37d1bba54f751bc76aafae7e&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minutely,hourly,alerts";
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
                                div.addClass("col-md-2 col-12");
                                let h3 = $("<h3>");
                                h3.text(moment(currentDate).add((1 + i), 'days'));
                                let icon = $("<img>");
                                icon.attr("src", "https://openweathermap.org/img/wn/" + dailyData[i].weather[0].icon + "@2x.png");
                                icon.attr("width", 80);
                                div.append(h3);
                                div.append(icon);
                                let futureTemperature = $('<p>')
                                let futureWind = $('<p>')
                                let futureHumidity = $('<p>');
                                futureTemperature.text("Temperature: " + dailyData[i].temp.day + " °C");
                                futureHumidity.text("Humidity: " + dailyData[i].humidity + "%");
                                futureWind.text("Wind Speed: " + dailyData[i].wind_speed + "m/s");
                                div.append(futureTemperature);
                                div.append(futureHumidity);
                                div.append(futureWind);
                                $("#forecast-data").append(div);
                            }
                        })
                })}
         })
};
