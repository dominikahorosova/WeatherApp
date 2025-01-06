import { weatherIconChange } from "./script_v2_1.js";
const apiKey = "a3a03a15b0bafa2ba0a52f19baf4c6fe";

export async function forecastWeather(query) {
  let apiU = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

  if (typeof query === 'string') {
    apiU += `&q=${query}`;
  } else if (query.lat && query.lon) {
    apiU += `&lat=${query.lat}&lon=${query.lon}`;
  };

  const response = await fetch(apiU);
  const data = await response.json();

  const forecast = document.getElementById('forecast');
  forecast.innerHTML = '';

  data.list.forEach((dataF) => {
    const forecastDay = dataF.dt_txt.split(' ')[1];

    if (forecastDay === "12:00:00") {
      forecastData(dataF, forecast);
    }
  })
}

export async function forecastData(dataF, container3) {
  try {
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast');

    const forecastDate = document.createElement('div');
    const rawDate = new Date(dataF.dt_txt);
    const formattedDate = rawDate.toLocaleDateString();

    forecastDate.textContent = formattedDate;
    forecastDate.classList.add('day');
    forecastElement.appendChild(forecastDate);

    const iconElement = document.createElement('img');
    iconElement.classList.add('tiny_icon');
    let icon = dataF.weather[0].id;
    iconElement.src = weatherIconChange(icon);
    forecastElement.appendChild(iconElement);

    const forecastTemp = document.createElement('div');
    forecastTemp.textContent = Math.floor(Math.round(dataF.main.temp)) + ' °C';
    forecastTemp.classList.add('forecast_temp');
    forecastElement.appendChild(forecastTemp);

    container3.appendChild(forecastElement);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('city').textContent = 'Weather data not available';
  }
}
