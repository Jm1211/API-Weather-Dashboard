var apiKey ='e5ca99e27fde43e65424c7417c9bbfe2';
var citiesList = [];
var unit = "units=imperial";
var dailyWeatherApiStarts =
  "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastWeatherApiStarts =
  "https://api.openweathermap.org/data/2.5/onecall?";

var searchCity = $('#searchCityForm')
var pastCities = $('#pastCities')

  let getCityWeather = function(searchCityName){
    var apiUrl= dailyWeatherApiStarts + searchCityName + '&' + apiKey + '&' + unit;

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            return response.json().then (function(response){
                $('#cityName').html(response.name);    

                var unixTime = response.dt;
                var currentDate = moment.unix(unixTime).format("MM/DD/YY");
                $('#currentdate').html(date);
            })
        }
    }
    )
  }


