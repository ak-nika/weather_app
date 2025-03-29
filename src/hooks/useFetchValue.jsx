import { useState } from "react";

const useFetchValue = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherByInput = async (input) => {
    if (!input.trim()) {
      setError("Please enter a valid location.");
      return;
    }

    setWeather(null);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}`
      );
      const data = await response.json();
      if (!data || !data.location) {
        throw new Error("Invalid location. Please try again.");
      }
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather.");
    }
  };

  return { weather, error, fetchWeatherByInput };
};

export default useFetchValue;
