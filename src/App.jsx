import { day, night } from "./assets";
import { useEffect, useState } from "react";
import { weatherDetails } from "./constants";
import DetailsCard from "./components/DetailsCard";
import Footer from "./components/Footer";
import useFetchLocation from "./components/hooks/useFetchLocation";
import useFetchValue from "./components/hooks/useFetchValue";
import WeatherCard from "./components/WeatherCard";
import { getValueFromPath } from "./components/utils";

export default function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [background, setBackground] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [weather, setWeather] = useState(null);

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
      const getWeather = async () => {
        const data = await useFetchLocation(
          location.latitude,
          location.longitude
        );

        const conditionText = data.current.condition.text.toLowerCase();
        const isDay = data.current.is_day === 1;

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
        setWeather(data);
      };

      getWeather();
    }
  }, [location, day, night]);

  const handleWeather = (inputValue) => {
    if (inputValue === "") {
      alert("Please enter a location");
      return;
    }

    const getWeather = async () => {
      const data = await useFetchValue(inputValue);

      const conditionText = data.current.condition.text.toLowerCase();
      const isDay = data.current.is_day === 1;

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
      setWeather(data);
    };

    getWeather();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleWeather(inputValue);
    }
  };
  if (weather) {
    return (
      <>
        <section
          className="bg-black w-full md:h-[95.6vh] flex lg:flex-row flex-col items-center justify-between"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <WeatherCard weather={weather} />

          <div
            id="bg"
            className="glass-background lg:w-[40%] w-full md:h-[95.6vh] lg:pb-0 pb-3"
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
                {weatherDetails.map((detail) => {
                  const value = getValueFromPath(weather, detail.value);

                  return (
                    <DetailsCard
                      value={value}
                      unit={detail.unit}
                      name={detail.name}
                      key={detail.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}
