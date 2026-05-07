import "./WeatherCard.css";
import { useEffect, useState } from "react";

type WeatherData = {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
};
export default function WeatherCard() {
  const [weather, setweather] = useState<WeatherData | null>(null);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?
  //              appid=${apikey}&units=metric&lang=kr&g=seoul`,
  //       );
  //       const data = await response.json();
  //       setweather(data);
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apikey = import.meta.env.VITE_OPEN_WEATHER_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric&lang=kr&lat=${lat}&lon=${lon}`,
        );
        const data = await response.json();
        setweather(data);
      },
      (error) => {
        console.log("error", error);
      },
    );
  }, []);
  if (!weather) {
    return <div>날씨를 불러오는 중입니다...</div>;
  }
  const weatherDetail = weather.weather?.[0];
  const icon = weatherDetail.icon;
  const description = weather.weather[0].description;
  const temp = weather.main.temp.toFixed(1);
  const iconurl = `https://openweathermap.org/img/wn/${icon}.png`;
  return (
    <div className="weather">
      <img src={iconurl} alt="weather icon" />
      <p>
        📍{description} , {temp}°C
      </p>
    </div>
  );
}
