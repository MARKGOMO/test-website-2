//Show-hide pass
let eyeIcon = document.getElementById("eyeIcon");
let password = document.getElementById("password");

eyeIcon.onclick = function(){
    if(password.type == "password"){
        password.type = "text";
        eyeIcon.src = "eye-open.png";
    }else{
        password.type = "password";
        eyeIcon.src = "eye-close.png";
        }
}


// Check if geolocation permission is already granted
if (localStorage.getItem('geolocationPermission') === 'granted') {
    getCurrentPosition();
} else {
    askForPermission();
}

function askForPermission() {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
        if (result.state === 'granted') {
            getCurrentPosition();
        } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(function(position) {
                localStorage.setItem('geolocationPermission', 'granted');
                getCurrentPosition();
            });
        }
    });
}

var timeInterval;

function updateWeatherAndTime(weatherObj, timezoneObj) {
  console.log(weatherObj);

  let description = weatherObj.weather[0].description;
  let capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  let firstSpaceIndex = capitalizedDescription.indexOf(' ');
  
  if (firstSpaceIndex !== -1) {
    capitalizedDescription = capitalizedDescription.substring(0, firstSpaceIndex + 1) +
      capitalizedDescription.charAt(firstSpaceIndex + 1).toUpperCase() +
      capitalizedDescription.slice(firstSpaceIndex + 2);
  }
  
  document.getElementById('weather').innerHTML = capitalizedDescription;
  document.getElementById('temp').innerHTML = weatherObj.main.temp + "&deg;C";
  document.getElementById('representation').src = "http://openweathermap.org/img/w/" + weatherObj.weather[0].icon + ".png";

  if (weatherObj.rain) {
    var chanceOfRain = weatherObj.rain['1h'];
    document.getElementById('rain').innerHTML = chanceOfRain + "%";
  } else if (weatherObj.pop) {
    var chanceOfRain = weatherObj.pop;
    document.getElementById('rain').innerHTML = chanceOfRain + "%";
  } else {
    document.getElementById('rain').innerHTML = "0%";
  }

  document.getElementById('location').value = weatherObj.name + ", " + weatherObj.sys.country;

  var currentDate = new Date();
  var timezone = timezoneObj.zoneName;
  var date = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: timezone };

  clearInterval(timeInterval); // Clear previous setInterval

  timeInterval = setInterval(function () {
    var currentTime = new Date();
    document.getElementById('time').innerHTML = currentTime.toLocaleString('en-US', { timeZone: timezone, timeStyle: 'medium' });
    document.getElementById('date').innerHTML = currentTime.toLocaleString('en-US', date);
  }, 1000);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var weatherLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=a41a2dcc089aaf448804d664431bbdcf&units=metric";
    var timezoneDBLink = "https://api.timezonedb.com/v2.1/get-time-zone?key=EOLA0L34M4HG&format=json&by=position&lat=" + latitude + "&lng=" + longitude;

    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open('GET', weatherLink, true);
    weatherRequest.onload = function () {
      if (weatherRequest.status >= 200 && weatherRequest.status < 400) {
        var weatherObj = JSON.parse(weatherRequest.responseText);

        var timezoneRequest = new XMLHttpRequest();
        timezoneRequest.open('GET', timezoneDBLink, true);
        timezoneRequest.onload = function () {
          if (timezoneRequest.status >= 200 && timezoneRequest.status < 400) {
            var timezoneObj = JSON.parse(timezoneRequest.responseText);
            updateWeatherAndTime(weatherObj, timezoneObj);
          } else {
            alert('Error!');
            getCurrentPosition();
          }
        };
        timezoneRequest.send();
      } else {
        alert('Error!');
        getCurrentPosition();
      }
    };
    weatherRequest.send();
  });
}

// Edit and get the location
let getLoc = document.getElementById("get-loc");
let editLoc = document.getElementById("edit-loc");
let locationInput = document.getElementById("location");

editLoc.addEventListener("click", function () {
  locationInput.style.pointerEvents = "auto";
  locationInput.value = "";
  locationInput.focus();
});

getLoc.addEventListener("click", function () {
  getCurrentPosition();
  locationInput.style.pointerEvents = "none";
});

locationInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    var cityName = locationInput.value;
    getLocationCoordinates(cityName);
    locationInput.style.pointerEvents = "none";
    locationInput.blur();
  }
});

function getLocationCoordinates(cityName) {
  var geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=a41a2dcc089aaf448804d664431bbdcf";

  var geocodingRequest = new XMLHttpRequest();
  geocodingRequest.open('GET', geocodingAPI, true);
  geocodingRequest.onload = function () {
    if (geocodingRequest.status >= 200 && geocodingRequest.status < 400) {
      var geocodingObj = JSON.parse(geocodingRequest.responseText);
      if (geocodingObj.length > 0) {
        var latitude = geocodingObj[0].lat;
        var longitude = geocodingObj[0].lon;
        getCurrentPositionWithCoordinates(latitude, longitude);
      } else {
        alert('No coordinates found for the provided city.');
        getCurrentPosition();
      }
    } else {
      alert('Please enter a valid city!');
      getCurrentPosition();
    }
  };
  geocodingRequest.send();
}

function getCurrentPositionWithCoordinates(latitude, longitude) {
  var weatherLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=a41a2dcc089aaf448804d664431bbdcf&units=metric";
  var timezoneDBLink = "https://api.timezonedb.com/v2.1/get-time-zone?key=EOLA0L34M4HG&format=json&by=position&lat=" + latitude + "&lng=" + longitude;

  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('GET', weatherLink, true);
  weatherRequest.onload = function () {
    if (weatherRequest.status >= 200 && weatherRequest.status < 400) {
      var weatherObj = JSON.parse(weatherRequest.responseText);

      var timezoneRequest = new XMLHttpRequest();
      timezoneRequest.open('GET', timezoneDBLink, true);
      timezoneRequest.onload = function () {
        if (timezoneRequest.status >= 200 && timezoneRequest.status < 400) {
          var timezoneObj = JSON.parse(timezoneRequest.responseText);
          updateWeatherAndTime(weatherObj, timezoneObj);
        } else {
          alert('Error!');
          getCurrentPosition();
        }
      };
      timezoneRequest.send();

    } else {
      alert('Error!');
      getCurrentPosition();
    }
  };
  weatherRequest.send();
}







