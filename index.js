const API_KEY = "229915056c2b2ef3c05881d674228d20";

const $container = document.querySelector(".container");
const $searchBtn = document.querySelector(".search-box button");
const $weatherBox = document.querySelector(".weather-box");
const $weatherDetails = document.querySelector(".weather-details");
const $notFound = document.querySelector(".not-found");

$searchBtn.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (!city) {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        $container.style.height = "400px";
        $weatherBox.style.display = "none";
        $weatherDetails.style.display = "none";
        $notFound.style.display = "block";
        $notFound.classList.add("fade-in");

        return;
      }

      $notFound.style.display = "none";
      $notFound.classList.remove("fade-in");

      const $image = document.querySelector(".weather-box img");
      const $temperature = document.querySelector(".temperature");
      const $description = document.querySelector(".description");
      const $humidity = document.querySelector(".humidity span");
      const $wind = document.querySelector(".wind span");

      $image.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      $temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      $description.innerHTML = `${json.weather[0].description}`;
      $humidity.innerHTML = `${json.main.humidity}%`;
      $wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      $weatherBox.style.display = "";
      $weatherDetails.style.display = "";
      $weatherBox.classList.add("fade-in");
      $weatherDetails.classList.add("fade-in");
      $container.style.height = "500px";
    });
});
