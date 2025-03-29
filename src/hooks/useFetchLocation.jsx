import { useState, useEffect } from "react";

const useFetchLocation = (lat, long) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !long) return;

    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}`
        );
        const data = await response.json();
        if (!data || !data.location) {
          throw new Error("Invalid location data.");
        }
        setWeather(data);
      } catch (err) {
        setError(err.message || "Failed to fetch weather.");
      }
    };

    fetchWeather();
  }, [lat, long]);

  return { weather, error };
};

export default useFetchLocation;
