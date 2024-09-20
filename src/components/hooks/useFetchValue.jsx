const useFetchValue = async (input) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}`
    );
    const weather = await data.json();

    return weather;
  } catch (error) {
    alert("Please enter a valid location");
    console.log(error);
  }
};

export default useFetchValue;
