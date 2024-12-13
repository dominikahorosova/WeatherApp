const apiURL = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
const apiKey = "a3a03a15b0bafa2ba0a52f19baf4c6fe";

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

hourly.forEach((forecast) => {
  const forecastElement = document.createElement('div');
  forecastElement.classList.add('forecast-item');
  forecastElement.innerHTML=`
    <div><strong>Time:</strong>${forecast.time}</div>
    <div><strong>Temperature:</strong>${forecast.temperature}</div>
    <div>${icon}</div>
  `;
  hourly.appendChild(forecastElement);
});