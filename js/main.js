$(document).ready(function () {
var btn = document.getElementById("button");
var temp = document.getElementById("temp");
var hum = document.getElementById("humidity");
var sky = document.getElementById("sky-view");
var wind = document.getElementById("wind");
var urlString = "";
getLocation();

function getLocation (){
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(showLocation);
		} else {
			alert("can't get your current location");
		};
	};

function showLocation(position) {
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	urlString =  "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=70cace8cb014417dab09ee19ea0090d8";
}

btn.addEventListener("click", function(){
	
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("GET", urlString )
	
	ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);

	}

 ourRequest.send();
});

function renderHTML(data) {
	wind.innerHTML = data.wind.speed + " mph";
	hum.innerHTML = data.main.humidity + "%";
	sky.innerHTML = data.weather[0].description;
	temp.innerHTML = Math.round((1.8*(data.main.temp - 273) + 32)) + " F";
}
});