import { day, night } from "./assets";
import { useEffect, useState } from "react";
import { weatherDetails } from "./constants";
import DetailsCard from "./components/DetailsCard";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const place = document.getElementById("place");
  const temp = document.getElementById("temp");
  const condition = document.getElementById("condition");
  const time = document.getElementById("time");
  const icon = document.getElementById("icon");
  const country = document.getElementById("country");
  const feelsLike = document.getElementById("feelsLike");
  const uv = document.getElementById("uv");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind");
  const sunRise = document.getElementById("sunRise");
  const sunSet = document.getElementById("sunSet");
  const moonRise = document.getElementById("moonRise");
  const moonSet = document.getElementById("moonSet");
  const rainChance = document.getElementById("rainChance");
  const snowChance = document.getElementById("snowChance");
  const bg = document.getElementById("bg");

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [background, setBackground] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.latitude},${location.longitude}`
      )
        .then((response) => response.json())
        .then((weather) => {
          place.innerHTML = weather.location.name;
          temp.innerText = `${weather.current.temp_c}°C`;
          condition.innerText = weather.current.condition.text;
          time.innerText = weather.location.localtime;
          icon.src = weather.current.condition.icon;
          country.innerText = weather.location.country;
          feelsLike.innerText = `${weather.current.feelslike_c} °C`;
          uv.innerText = weather.current.uv;
          humidity.innerText = `${weather.current.humidity}%`;
          windSpeed.innerText = `${weather.current.wind_kph} KPH`;
          sunRise.innerText = weather.forecast.forecastday[0].astro.sunrise;
          sunSet.innerText = weather.forecast.forecastday[0].astro.sunset;
          moonRise.innerText = weather.forecast.forecastday[0].astro.moonrise;
          moonSet.innerText = weather.forecast.forecastday[0].astro.moonset;
          rainChance.innerText = `${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`;
          snowChance.innerText = `${weather.forecast.forecastday[0].day.daily_chance_of_snow}%`;

          icon.classList.remove("hidden");

          const conditionText = weather.current.condition.text.toLowerCase();
          const isDay = weather.current.is_day === 1;

          bg.classList.add(isDay ? "bg-black" : "");

          let image;
          if (conditionText.includes("cloud")) {
            image = isDay ? day.cloudy : night.cloudy;
          } else if (conditionText.includes("rain")) {
            image = isDay ? day.rainy : night.rainy;
          } else if (conditionText.includes("snow")) {
            image = isDay ? day.snowy : night.snowy;
          } else {
            image = isDay ? day.clear : night.clear;
          }

          setBackground(image);
        })
        .catch((err) => console.log(err));
    }
  }, [location, apiKey, day, night]);

  const handleWeather = (inputValue) => {
    if (inputValue === "") {
      alert("Please enter a location");
      return;
    }

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputValue}`
    )
      .then((response) => response.json())
      .then((weather) => {
        place.innerHTML = weather.location.name;
        temp.innerText = `${weather.current.temp_c}°C`;
        condition.innerText = weather.current.condition.text;
        time.innerText = weather.location.localtime;
        icon.src = weather.current.condition.icon;
        country.innerText = weather.location.country;
        feelsLike.innerText = `${weather.current.feelslike_c} °C`;
        uv.innerText = weather.current.uv;
        humidity.innerText = `${weather.current.humidity}%`;
        windSpeed.innerText = `${weather.current.wind_kph} KPH`;
        sunRise.innerText = weather.forecast.forecastday[0].astro.sunrise;
        sunSet.innerText = weather.forecast.forecastday[0].astro.sunset;
        moonRise.innerText = weather.forecast.forecastday[0].astro.moonrise;
        moonSet.innerText = weather.forecast.forecastday[0].astro.moonset;
        rainChance.innerText = `${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`;
        snowChance.innerText = `${weather.forecast.forecastday[0].day.daily_chance_of_snow}%`;

        icon.classList.remove("hidden");

        const conditionText = weather.current.condition.text.toLowerCase();
        const isDay = weather.current.is_day === 1;

        bg.classList.add(isDay ? "bg-black" : "");

        let image;
        if (conditionText.includes("cloud")) {
          image = isDay ? day.cloudy : night.cloudy;
        } else if (conditionText.includes("rain")) {
          image = isDay ? day.rainy : night.rainy;
        } else if (conditionText.includes("snow")) {
          image = isDay ? day.snowy : night.snowy;
        } else {
          image = isDay ? day.clear : night.clear;
        }

        setBackground(image);
      })
      .catch((err) => {
        alert(`Cannot find ${inputValue}. Please try again.`);
        return;
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleWeather(inputValue);
    }
  };
  return (
    <>
      <section
        className="bg-black w-full lg:h-[95.6vh] flex lg:flex-row flex-col items-center justify-between"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col lg:pl-6 lg:pb-12 lg:py-12 py-4 justify-between lg:h-[95.6vh] lg:w-[50%] ">
          <h3 className="font-semibold text-xl text-white">Weather App</h3>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 id="temp" className="text-white font-bold text-8xl"></h1>

            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-between gap-4">
                <h1
                  id="place"
                  className="text-white font-semibold text-5xl"
                ></h1>
                <p id="time" className="text-white font-bold"></p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <img
                  id="icon"
                  alt="weather"
                  className="hidden"
                  width={64}
                  height={64}
                />
                <p id="condition" className="text-white font-bold"></p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="bg"
          className="glass-background lg:w-[40%] w-full lg:h-[95.6vh] lg:pb-0 pb-3"
        >
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center justify-center">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search Location..."
                className="w-[80%] h-12 mx-auto pl-4 border-b-[1px] border-secondary bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div className="px-[10%] mt-6">
            <h3 className="text-white font-semibold text-xl">
              Weather Details
            </h3>

            <div className="mt-5 flex flex-col w-full gap-4">
              {weatherDetails.map((detail) => (
                <DetailsCard
                  id={detail.idName}
                  name={detail.name}
                  key={detail.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full h-fit bg-footer lg:py-1 py-2 flex flex-col gap-2 items-start md:items-center md:gap-0 md:flex-row justify-between px-4">
        <p className="text-dim text-sm">
          &#169; 2024 Weather App ver. 1.2.1. All rights reserved.
        </p>
        <p className="text-dim text-sm">
          Made by{" "}
          <a
            href="https://github.com/ak-nika/"
            className="text-white font-bold underline hover:no-underline"
          >
            ak-nika
          </a>
        </p>
        <p className="text-dim text-sm">Powered by OpenWeather</p>
      </footer>
    </>
  );
}
