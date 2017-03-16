
var btn = document.getElementById("button");
var temp = document.getElementById("temp");
var hum = document.getElementById("humidity");
var sky = document.getElementById("sky-view");
var wind = document.getElementById("wind");
var urlString = "";
var background = document.getElementById("body");
var far = document.getElementById("far");
var cel = document.getElementById("cel");


function getLocation (){
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(showLocation);
		} else {
			alert("can't get your current location");
		};
	};
	getLocation();

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
	if (data.weather[0].main == "Clear") {
		background.style.backgroundImage = "url('http://img02.deviantart.net/d2c2/i/2005/028/b/6/clear_day_by_juanchis.jpg')";
	} else if (data.weather[0].main == "Clouds"){
		background.style.backgroundImage = "url('http://cdnfiles.hdrcreme.com/49001/original/cloudy-day.jpg?1426718412')";
	} else if(data.weather[0].main == "Snow"){
		background.style.backgroundImage = "url('http://www.pxleyes.com/images/contests/swiss-border/fullsize/A-snowy-day-4e553567bfd4c_hires.jpg')";
	} else if(data.weather[0].main == "Rain"){
		background.style.backgroundImage = "url('http://az616578.vo.msecnd.net/files/2016/09/29/636107801986928882-1423858133_rainy-day.jpg')";
	} else {
		background.style.backgroundImage = "url('http://www.adventureinparadiseinc.com/wp-content/gallery/sunset-dolphin-gallery/sanibel-captiva-sunset-boat-tour.jpg')";
	}
	console.log(data.weather[0].main);
	far.addEventListener("click", function(){
	temp.innerHTML = Math.round((1.8*(data.main.temp - 273) + 32)) + " F";

});

cel.addEventListener("click", function (){
	temp.innerHTML = Math.round(data.main.temp - 273.15) + " C";
});


}


