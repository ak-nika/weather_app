export const weatherDetails = [
  {
    id: 1,
    value: weather.location.country,
    name: "Country",
  },
  {
    id: 2,
    value: weather.current.feelslike_c,
    name: "Feels Like",
    unit: "°C",
  },
  {
    id: 3,
    value: weather.current.uv,
    name: "UV Index",
  },
  {
    id: 4,
    value: weather.current.humidity,
    name: "Humidity",
    unit: "%",
  },
  {
    id: 5,
    value: weather.current.wind_kph,
    name: "Wind Speed",
    unit: "KPH",
  },
  {
    id: 6,
    value: weather.forecast.forecastday[0].astro.sunrise,
    name: "Sun Rise",
  },
  {
    id: 7,
    value: weather.forecast.forecastday[0].astro.sunset,
    name: "Sun Set",
  },
  {
    id: 8,
    value: weather.forecast.forecastday[0].astro.moonrise,
    name: "Moon Rise",
  },
  {
    id: 9,
    value: weather.forecast.forecastday[0].astro.moonset,
    name: "Moon Set",
  },
  {
    id: 10,
    value: weather.forecast.forecastday[0].day.daily_chance_of_rain,
    name: "Chance of Rain",
    unit: "%",
  },
  {
    id: 11,
    value: weather.forecast.forecastday[0].day.daily_chance_of_snow,
    name: "Chance of Snow",
    unit: "%",
  },
];
