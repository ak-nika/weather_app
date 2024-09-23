import WeatherCard from "./WeatherCard";

const Weather = ({ weather }) => {
  return (
    <div className="flex flex-col lg:px-6 lg:pb-12 lg:py-12 py-4 justify-between md:h-[95.6vh] lg:w-[60%] sm:ml-6 lg:ml-0">
      <h3 className="font-semibold text-xl text-white ml-2 lg:ml-0">
        Weather App
      </h3>

      <div className="hidden lg:flex items-center flex-nowrap gap-5 overflow-x-scroll hide-scrollbar">
        {weather.forecast.forecastday[0].hour.map((card, index) => (
          <WeatherCard
            key={index}
            rain={card.chance_of_rain}
            icon={card.condition.icon}
            temp={card.temp_c}
            time={index}
            text={card.condition.text}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        <h1 id="temp" className="text-white font-bold text-7xl md:text-8xl">
          {weather.current.temp_c} °C
        </h1>

        <div className="lg:hidden flex items-center flex-nowrap gap-5 overflow-x-scroll hide-scrollbar my-2 w-screen p-2 pr-7">
          {weather.forecast.forecastday[0].hour.map((card, index) => (
            <WeatherCard
              key={index}
              rain={card.chance_of_rain}
              icon={card.condition.icon}
              temp={card.temp_c}
              time={index}
              text={card.condition.text}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center justify-between gap-4">
            <h1 id="place" className="text-white font-semibold text-5xl">
              {weather.location.name}
            </h1>
            <p id="time" className="text-white font-bold">
              {weather.location.localtime}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img
              id="icon"
              alt="weather"
              className={weather.current.condition.icon ? "" : "hidden"}
              src={weather.current.condition.icon || ""}
              width={64}
              height={64}
            />
            <p id="condition" className="text-white font-bold">
              {weather.current.condition.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
