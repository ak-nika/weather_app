import { day, night } from "./assets"; // images for background
import { useEffect, useState } from "react";
import { weatherDetails } from "./constants";
import DetailsCard from "./components/DetailsCard";
import Footer from "./components/Footer";
import useFetchLocation from "./hooks/useFetchLocation";
import useFetchValue from "./hooks/useFetchValue";
import Weather from "./components/Weather";
import { getValueFromPath } from "./utils";
import Loading from "./components/Loading";

export default function App() {
  // Set state for location, background, inputValue, error, and weather
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [background, setBackground] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [locationError, setLocationError] = useState(null); // Store location access errors
  const [error, setError] = useState(null); // Store input-related errors
  const [weather, setWeather] = useState(null); // Store weather data separately

  // Custom hooks
  const { weather: locationWeather, error: fetchLocationError } =
    useFetchLocation(location.latitude, location.longitude);
  const {
    weather: inputWeather,
    error: inputError,
    fetchWeatherByInput,
  } = useFetchValue();

  // Get current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null); // Clear error if successful
        },
        () => {
          setLocationError(
            "Location access denied. Please enable location services."
          );
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Use the most relevant weather data and update state
  useEffect(() => {
    if (inputWeather) {
      setWeather(inputWeather); // Prioritize searched weather
      setError(null); // Clear any errors after successful fetch
    } else if (locationWeather) {
      setWeather(locationWeather); // Use location-based weather if no inputWeather
    }
  }, [inputWeather, locationWeather]);

  const currentError =
    error || inputError || fetchLocationError || locationError; // Prioritize most relevant error

  // Update background based on weather
  useEffect(() => {
    if (weather) {
      const conditionText = weather.current.condition.text.toLowerCase();
      const isDay = weather.current.is_day === 1;

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
      setInputValue(""); // Clear input after successful fetch
    }
  }, [weather]);

  // Fetch weather by input
  const handleSearch = async () => {
    if (inputValue.trim().length > 1) {
      setError(null); // Clear previous error before fetching
      try {
        const newWeather = await fetchWeatherByInput(inputValue);
        setWeather(newWeather); // Update weather state immediately
      } catch (err) {
        setError("Failed to fetch weather. Please try again.");
      }
    } else {
      setError("Please enter a valid location.");
    }
  };

  // Handle Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {!weather && <Loading location={inputValue} />}

      {currentError && !weather && (
        <section className="w-full h-full fixed inset-0 bg-footer flex flex-col justify-center items-center gap-3">
          <p className="text-red-500 font-bold">Error: {currentError}</p>
          <p className="text-white">Enter a location to continue:</p>

          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="max-w-[900px] bg-transparent text-white border-white border-[1px] outline-none rounded-lg p-2"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-slate-600 rounded-lg ml-4"
            >
              Search
            </button>
          </div>
        </section>
      )}

      {weather && (
        <>
          <section
            className="bg-black w-full md:h-[95.6vh] h-fit flex lg:flex-row flex-col items-center justify-between"
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Weather weather={weather} />

            <div className="glass-background lg:w-[40%] w-full md:h-[95.6vh] lg:pb-0 pb-3">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-center">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Search Location..."
                    className="w-[80%] h-12 mx-auto pl-4 border-b-[1px] border-secondary bg-transparent placeholder-white text-white outline-none"
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
      )}
    </>
  );
}
