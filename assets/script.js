var apiKey= "c4a23c57bf39555f8641c112ef2c2d92";

var currentDate = moment().format("MM/DD/YYYY");
$("#currentdate").text(currentDate);

let weather = {
      apiKey: "c4a23c57bf39555f8641c112ef2c2d92",
      fetchWeather: function (city) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey 
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
      },
      displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon,description,temp,humidity,speed)
        document.querySelector("#cityName").innerHTML = name;
        document.querySelector("#weatherIcon").src = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector("#tempToday").innerHTML =  + temp + "°F";
        document.querySelector("#humidityToday").innerHTML = + humidity + "%";
        document.querySelector("#windSpeedToday").innerHTML = + speed + "km/h";
      }, 
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
      },
    };

    document.querySelector(".btn").addEventListener("click", function () {
        event.preventDefault();
        weather.search();
      });
      
     

  