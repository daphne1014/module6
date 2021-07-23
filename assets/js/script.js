function cityWeather(){
    let apiUrl="https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=9c76c7ef37d1bba54f751bc76aafae7e";
    fetch(apiUrl).then(function(response) {
        return response.json();
    });
};