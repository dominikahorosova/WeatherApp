const apiKey = "a3a03a15b0bafa2ba0a52f19baf4c6fe";

//ACTUAL WEATHER
export async function actualWeather(query) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

  if (typeof query === "string") {
    apiUrl += `&q=${query}`;
  } else if (query.lat && query.lon) {
    apiUrl += `&lat=${query.lat}&lon=${query.lon}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    const timezoneOffset = data.timezone * 1000;
    const localTime = new Date(Date.now() + timezoneOffset);
    document.getElementById("actualTime").textContent =
      localTime.toLocaleDateString();

    document.getElementById("city").textContent = data.name;

    document.getElementById("temp").textContent =
      Math.floor(Math.round(data.main.temp)) + " °C";
    document.querySelector(".condition").textContent = data.weather[0].main;

    document.getElementById("feels").textContent =
      Math.floor(Math.round(data.main.feels_like)) + " °C";
    document.getElementById("humidity").textContent = data.main.humidity + " %";
    document.getElementById("wind").textContent = data.wind.speed + " km/h";
    document.getElementById("visibility").textContent =
      Math.floor(Math.round(data.visibility / 1000)) + " km";

    const sunsetTime = data.sys.sunset;
    const sunsetDate = new Date(sunsetTime * 1000);
    document.getElementById("sunset").textContent =
      sunsetDate.toLocaleTimeString();

    const sunriseTime = data.sys.sunrise;
    const sunriseDate = new Date(sunriseTime * 1000);
    document.getElementById("sunrise").textContent =
      sunriseDate.toLocaleTimeString();

    const weatherIcon = document.querySelector(".weatherIcon");
    let icon = data.weather[0].id;
    weatherIcon.src = weatherIconChange(icon);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("city").textContent = "Weather data not available";
  }
}

//HOURLY WEATHER
export async function hourlyWeather(query) {
  let apiU = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

  if (typeof query === "string") {
    apiU += `&q=${query}`;
  } else if (query.lat && query.lon) {
    apiU += `&lat=${query.lat}&lon=${query.lon}`;
  }
  try {
    await hourlyTemp(apiU);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("city").textContent = "Weather data not available";
  }
}

export async function hourlyTemp(apiU) {
  const response = await fetch(apiU);
  const data = await response.json();

  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const times = document.getElementById("times");
  times.innerHTML = "";

  data.list.forEach((dataTime) => {
    const forecastDate = dataTime.dt_txt.split(" ")[0];

    if (forecastDate === todayDate) {
      hourlyElements(dataTime, times);
    }
  });
}

export function hourlyElements(dataTime, container) {
  try {
    const hourElement = document.createElement("div");
    hourElement.classList.add("hour");

    const timeOnly = dataTime.dt_txt.substring(11, 16);
    const timeElement = document.createElement("div");
    timeElement.textContent = timeOnly;
    timeElement.classList.add("hour-time");
    hourElement.appendChild(timeElement);

    const iconElement = document.createElement("img");
    iconElement.classList.add("small_icon");
    let icon = dataTime.weather[0].id;
    iconElement.src = weatherIconChange(icon);
    hourElement.appendChild(iconElement);

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    const description = dataTime.weather[0].main;
    descriptionElement.textContent = description;
    hourElement.appendChild(descriptionElement);

    const tempElement = document.createElement("div");
    tempElement.classList.add("hour_temp");
    const temp = Math.floor(Math.round(dataTime.main.temp)) + " °C";
    tempElement.textContent = temp;
    hourElement.appendChild(tempElement);

    container.appendChild(hourElement);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("city").textContent = "Weather data not available";
  }
}

//ICON CHANGE
export function weatherIconChange(icon) {
  if (icon >= 200 && icon <= 232) {
    return "weather-app-img/drizzle.png";
  } else if (icon >= 300 && icon <= 321) {
    return "weather-app-img/drizzle.png";
  } else if (icon >= 500 && icon <= 531) {
    return "weather-app-img/rain.png";
  } else if (icon >= 600 && icon <= 622) {
    return "weather-app-img/snow.png";
  } else if (icon >= 623 && icon <= 799) {
    return "weather-app-img/clouds.png";
  } else if (icon === 800) {
    return "weather-app-img/clear.png";
  } else if (icon >= 801 && icon <= 804) {
    return "weather-app-img/clouds.png";
  }
}
