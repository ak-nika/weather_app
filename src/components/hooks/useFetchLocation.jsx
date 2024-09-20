const useFetchLocation = async (lat, long) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}`
    );
    const weather = await data.json();
    return weather;
  } catch (error) {
    console.log(error);
  }
};

export default useFetchLocation;
