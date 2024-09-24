const WeatherCard = ({ rain, icon, temp, time, text }) => {
  // Add 0 in front of the time if it is less than 10
  if (time < 10) {
    time = `0${time}`;
  }
  return (
    <div className="glass-background bg-gray-600 p-4 h-full border-white border-[2px] rounded-xl w-[150px] flex flex-col items-center gap-1 shrink-0">
      <p className="text-slate-300 text-center">{time}:00</p>
      <img src={icon} className="w-12 h-12" alt="weather icon" />
      <p className="text-white font-bold text-center">{text}</p>
      <h3 className="text-white font-bold text-center">{temp}°C</h3>
      <p className="text-slate-300 text-center">{rain}% chance of rain</p>
    </div>
  );
};

export default WeatherCard;
