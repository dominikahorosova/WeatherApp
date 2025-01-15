const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

import { actualWeather } from "./script_v2_1.js";
import { hourlyWeather } from "./script_v2_1.js";
import { forecastWeather } from "./script_v2_2.js";

//CHANGE MODE
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  let theme;

  if (savedTheme) {
    theme = savedTheme;
  } else {
    theme = systemPrefersDark ? "dark" : "light";
  }

  applyTheme(theme);
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    if (!localStorage.getItem("theme")) {
      initTheme();
    }
  });
});

//LOCATION
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
        document.getElementById(
          "city"
        ).textContent = `Failed to obtain location.`;
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    document.getElementById(
      "city"
    ).textContent = `The browser does not support geolocation.`;
  }
}

window.onload = getLocation;

//SEARCH

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    actualWeather(city);
    hourlyWeather(city);
    forecastWeather(city);
  } else {
    console.log(`zadejte mesto`);
  }
});

searchInput.addEventListener("keydown", (e) => {
  const city = searchInput.value.trim();
  if (city) {
    if (e.key === "Enter") {
      actualWeather(city);
      hourlyWeather(city);
      forecastWeather(city);
    }
  } else {
    console.log(`zadejte mesto`);
  }
});
