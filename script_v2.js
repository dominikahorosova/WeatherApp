const toggleButton = document.getElementById('toggleButton');
const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

celsius.addEventListener('click', () => {
  toggleButton.style.left = '0px';
});

fahrenheit.addEventListener('click', () => {
  toggleButton.style.left = '50px';
});


import { actualWeather } from "./script_v2_1.js";
import { hourlyWeather } from "./script_v2_1.js";
import { forecastWeather } from "./script_v2_2.js";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        actualWeather({ lat: latitude, lon: longitude });
        hourlyWeather({ lat: latitude, lon: longitude });
        forecastWeather({ lat: latitude, lon: longitude });
      },
      (error) => {
        document.getElementById('city').textContent = `Failed to obtain location.`;
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  } else {
    document.getElementById('city').textContent = `The browser does not support geolocation.`;
  }
}

window.onload = getLocation;


searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    actualWeather(city);
    hourlyWeather(city);
    forecastWeather(city);
  } else {
    console.log(`zadejte mesto`);
  }
});

searchInput.addEventListener('keydown', (e) => {
  const city = searchInput.value.trim();
  if (city) {
    if (e.key === 'Enter') {
      actualWeather(city);
      hourlyWeather(city);
      forecastWeather(city);
    }
  } else {
    console.log(`zadejte mesto`);
  }
});