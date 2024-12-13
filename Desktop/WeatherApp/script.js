
const toggleButton = document.getElementById('toggleButton');
const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');

celsius.addEventListener('click', () => {
  toggleButton.style.left = '0px';
});

fahrenheit.addEventListener('click', () => {
  toggleButton.style.left = '50px';
});

const hourly = document.getElementById('hourly');

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const actualTime = document.getElementById('actualTime');

async function searchCity(city) {
  const apiKey = "a3a03a15b0bafa2ba0a52f19baf4c6fe";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiURL);
  const data = await response.json();

  const timezoneOffset = data.timezone * 1000;
  const localTime = new Date(Date.now() + timezoneOffset);
  document.getElementById('actualTime').textContent = localTime.toLocaleDateString();

  document.getElementById('city').textContent = data.name;

  document.getElementById('temp').textContent = Math.floor(Math.round(data.main.temp)) + ' °C';
  document.querySelector('.condition').textContent = data.weather[0].main;

  document.getElementById('feels').textContent = Math.floor(Math.round(data.main.feels_like)) + ' °C';
  document.getElementById('humidity').textContent = data.main.humidity + ' %';
  document.getElementById('wind').textContent = data.wind.speed + ' km/h';
  document.getElementById('visibility').textContent = data.visibility / 1000 + ' km';

  let weatherIcon = document.querySelector('.weatherIcon');
  let iconId = data.weather[0].id;

  if (iconId >= 200 && iconId <= 232) {
    weatherIcon.src = "weather-app-img/drizzle.png";
  } else if (iconId >= 300 && iconId <= 321) {
    weatherIcon.src = "weather-app-img/drizzle.png";
  } else if (iconId >= 500 && iconId <= 531) {
    weatherIcon.src = "weather-app-img/rain.png";
  } else if (iconId >= 600 && iconId <= 622) {
    weatherIcon.src = "weather-app-img/snow.png";
  } else if (iconId === 800) {
    weatherIcon.src = "weather-app-img/clear.png";
  } else if (iconId >= 801 && iconId <= 804) {
    weatherIcon.src = "weather-app-img/clouds.png";
  }
}



searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    searchCity(city);
  } else {
    console.log(`zadejte mesto`);
  }
});

