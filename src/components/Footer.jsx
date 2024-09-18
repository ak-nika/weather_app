const Footer = () => {
  return (
    <footer className="w-full h-fit lg:py-1 py-2 flex flex-col gap-2 items-start md:items-center md:gap-0 md:flex-row justify-between px-4">
      <p className="text-dim text-sm">
        &#169; 2024 Weather App ver. 1.2.2. All rights reserved.
      </p>
      <p className="text-dim text-sm">
        Made by{" "}
        <a
          href="https://github.com/ak-nika/"
          className="text-white font-bold underline hover:no-underline"
        >
          ak-nika
        </a>
      </p>
      <p className="text-dim text-sm">Powered by OpenWeather</p>
    </footer>
  );
};

export default Footer;
