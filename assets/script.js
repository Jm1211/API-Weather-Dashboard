
let city = "";
let searchCity = $("#searchCity");
let searchButton = $("#searchButton");
let clearButton = $("#clear-history");
let currentCity = $("#currentCity");
let currentTemperature = $("#tempToday");
let currentHumidity = $("#humidityToday");
let currentWSpeed = $("#windSpeedToday");
let currentUvindex = $("#UVindexToday");
let sCity = [];

function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (c.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}

// set up API key for weather
let apiKey= "c4a23c57bf39555f8641c112ef2c2d92";


function displayWeather(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}

// function to display current weather
function currentWeather(city) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
  
    let weathericon = response.weather[0].icon;
    let iconurl =
      "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";

    let date = new Date(response.dt * 1000).toLocaleDateString();
    $(currentCity).html(
      response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
    );

    
    let tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(currentTemperature).html(tempF.toFixed(2) + "&#8457");
    $(currentHumidity).html(response.main.humidity + "%");

    let ws = response.wind.speed;
    let windsmph = (ws * 2.237).toFixed(1);
    $(currentWSpeed).html(windsmph + "MPH");
    UVIndex(response.coord.lon, response.coord.lat);
    forecast(response.id);
    if (response.cod == 200) {
      sCity = JSON.parse(localStorage.getItem("cityname"));
      console.log(sCity);
      if (sCity == null) {
        sCity = [];
        sCity.push(city.toUpperCase());
        localStorage.setItem("cityname", JSON.stringify(sCity));
        addToList(city);
      } else {
        if (find(city) > 0) {
          sCity.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(sCity));
          addToList(city);
        }
      }
    }
  });
}
function UVIndex(ln, lt) {
  let uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    apiKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (response) {
    $(currentUvindex).html(response.value);
  });
}

// displaying 5 day forecast
function forecast(cityid) {
  
  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityid +
    "&appid=" +
    apiKey;
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    for (i = 0; i < 5; i++) {
      const date = new Date(
        response.list[(i + 1) * 8 - 1].dt * 1000
      ).toLocaleDateString();
      const iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
      const iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
      const tempK = response.list[(i + 1) * 8 - 1].main.temp;
      const tempF = ((tempK - 273.5) * 1.8 + 32).toFixed(2);
      const humidity = response.list[(i + 1) * 8 - 1].main.humidity;
      const ws = response.list[(i + 1) * 8 - 1].wind.speed;
      const windsmph = (ws * 2.237).toFixed(1);

      $("#Date" + i).html(date);
      $("#weatherIcon" + i).html("<img src=" + iconurl + ">");
      $("#tempDay" + i).html(tempF + "&#8457");
      $("#humidityDay" + i).html(humidity + "%");
      $("#windDay" + i).html(windsmph + "MPH");
    }
  });
}

function addToList(c) {
  let listEl = $("<li>" + c.toUpperCase() + "</li>");
  $(listEl).attr("class", "list-group-item");
  $(listEl).attr("data-value", c.toUpperCase());
  $(".list-group").append(listEl);
}

function invokePastSearch(event) {
  let liEl = event.target;
  if (event.target.matches("li")) {
    city = liEl.textContent.trim();
    currentWeather(city);
  }
}

function loadlastCity() {
  $("ul").empty();
  let sCity = JSON.parse(localStorage.getItem("cityname"));
  if (sCity !== null) {
    sCity = JSON.parse(localStorage.getItem("cityname"));
    for (i = 0; i < sCity.length; i++) {
      addToList(sCity[i]);
    }
    city = sCity[i - 1];
    currentWeather(city);
  }
}


function clearHistory(event) {
  event.preventDefault();
  sCity = [];
  localStorage.removeItem("cityname");
  document.location.reload();
}

//  handlers
$("#searchButton").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);

     