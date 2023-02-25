import config from "./api/config";

export const weatherAppInit = () => {
  const $container: HTMLDivElement | null =
    document.querySelector(".container");
  const $searchBtn: HTMLButtonElement | null =
    document.querySelector(".search-box button");
  const $weatherBox: HTMLDivElement | null =
    document.querySelector(".weather-box");
  const $weatherDetails: HTMLDivElement | null =
    document.querySelector(".weather-details");
  const $notFound: HTMLDivElement | null = document.querySelector(".not-found");

  $searchBtn?.addEventListener("click", () => {
    const city: string = (
      document.querySelector(".search-box input") as HTMLInputElement
    ).value;

    if (!city) {
      return;
    }

    fetch(
      `https://${
        config.endpoint
      }/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          $container && ($container.style.height = "400px");
          $weatherBox && ($weatherBox.style.display = "none");
          $weatherDetails && ($weatherDetails.style.display = "none");
          $notFound && ($notFound.style.display = "block");
          $notFound?.classList.add("fade-in");

          return;
        }

        $notFound && ($notFound.style.display = "none");
        $notFound?.classList.remove("fade-in");

        const $image: HTMLImageElement | null =
          document.querySelector(".weather-box img");
        const $temperature: HTMLParagraphElement | null =
          document.querySelector(".temperature");
        const $description: HTMLParagraphElement | null =
          document.querySelector(".description");
        const $humidity: HTMLSpanElement | null =
          document.querySelector(".humidity span");
        const $wind: HTMLSpanElement | null =
          document.querySelector(".wind span");

        $image &&
          ($image.src = `http://${config.base_url}/img/wn/${json.weather[0].icon}@2x.png`);
        $temperature &&
          ($temperature.innerHTML = `${parseInt(
            json.main.temp
          )}<span>°C</span>`);
        $description &&
          ($description.innerHTML = `${json.weather[0].description}`);
        $humidity && ($humidity.innerHTML = `${json.main.humidity}%`);
        $wind && ($wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`);

        if ($weatherBox) {
          $weatherBox.style.display = "";
          $weatherBox.classList.add("fade-in");
        }

        if ($weatherDetails) {
          $weatherDetails.style.display = "";
          $weatherDetails.classList.add("fade-in");
        }

        $container && ($container.style.height = "500px");
      });
  });
};
