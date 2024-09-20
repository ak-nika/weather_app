const WeatherCard = ({ weather }) => {
  return (
    <div className="flex flex-col lg:pl-6 lg:pb-12 lg:py-12 py-4 justify-between md:h-[95.6vh] lg:w-[50%] ">
      <h3 className="font-semibold text-xl text-white">Weather App</h3>

      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h1 id="temp" className="text-white font-bold text-8xl">
          {weather.current.temp_c}
        </h1>

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

export default WeatherCard;
