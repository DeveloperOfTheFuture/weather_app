import "./style.css";
import { weatherAppInit } from "./index";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <div class="search-box">
      <i class="fa-solid fa-location-dot"></i>
      <input type="text" placeholder="Enter location" />
      <button class="fa-solid fa-magnifying-glass"></button>
    </div>

    <div class="not-found">
      <img src="/images/404.png" alt="not found" />
      <p>Oops! Invalid location :(</p>
    </div>

    <div class="weather-box">
      <img />
      <p class="temperature"></p>
      <p class="description"></p>
    </div>

    <div class="weather-details">
      <div class="humidity">
        <i class="fa-solid fa-water"></i>
        <div class="text">
          <span></span>
          <p>Humidity</p>
        </div>
      </div>
      <div class="wind">
        <i class="fa-solid fa-wind"></i>
        <div class="text">
          <span></span>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  </div>
`;

weatherAppInit();
