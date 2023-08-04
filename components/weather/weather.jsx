import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Weather.module.css";
import useWindowDimensions from "../../utils/useWindowDimensions";

const Weather = () => {
  const [data, setData] = useState();

  const { width, height } = useWindowDimensions();

  const getPhoto = (string) => {
    let text = "";
    switch (string) {
      case "01d": {
        text = "https://i.ibb.co/YWpMnm4/01d.png";
        break;
      }
      case "01n": {
        text = "https://i.ibb.co/myw5fnL/01n.png";
        break;
      }
      case "02d": {
        text = "https://i.ibb.co/bQs8R0T/02d.png";
        break;
      }
      case "02n": {
        text = "https://i.ibb.co/JCPv3Hx/02n.png";
        break;
      }
      case "03d": {
        text = "https://i.ibb.co/n1q9qqZ/03d.png";
        break;
      }
      case "03n": {
        text = "https://i.ibb.co/n1q9qqZ/03d.png";
        break;
      }
      case "04d": {
        text = "https://i.ibb.co/bLxyxpF/04d.png";
        break;
      }
      case "04n": {
        text = "https://i.ibb.co/zS0TyBW/04n.png";
        break;
      }
      case "09d": {
        text = "https://i.ibb.co/LQPLjQB/09d.png";
        break;
      }
      case "09n": {
        text = "https://i.ibb.co/LQPLjQB/09d.png";
        break;
      }
      case "10d": {
        text = "https://i.ibb.co/vL8DDTc/10d.png";
        break;
      }
      case "10n": {
        text = "https://i.ibb.co/yQqXd64/10n.png";
        break;
      }
      case "11d": {
        text = "https://i.ibb.co/k8jbcMX/11d.png";
        break;
      }
      case "11n": {
        text = "https://i.ibb.co/Kh1zyPP/11n.png";
        break;
      }
      case "13d": {
        text = "https://i.ibb.co/3R4WG15/13d.png";
        break;
      }
      case "13n": {
        text = "https://i.ibb.co/3R4WG15/13n.png";
        break;
      }
      case "50d": {
        text = "https://i.ibb.co/WP4rQYv/50d.png";
        break;
      }
      case "50n": {
        text = "https://i.ibb.co/WP4rQYv/50n.png";
        break;
      }
      default: {
        text = "";
        break;
      }
    }
    return text;
  };

  useEffect(() => {
    (async function fetchData() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Mamaia&units=Metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      if (data.message === undefined) setData(data);
      else setData(data.message);
    })();
  }, []);

  return (
    <>
      <div className={styles.temperatureContainer}>
        <div className={styles.temperatureContent}>
          <h2 className={styles.weatherContent}>{data?.name}</h2>
          <h2 className={styles.weatherContent}>
            {data?.main?.feels_like.toFixed(1)}°C
          </h2>
        </div>
        <div className={styles.temperatureIcon}>
          <Image
            src={data ? getPhoto(data.weather[0].icon) : "/static/add.svg"}
            alt=""
            layout="fill"
          />
        </div>
        <div className={styles.temperatureLiquid}></div>
      </div>
      <iframe
        width={"85%"}
        height={
          height > 800 ? "400" : height < 600 ? height - 320 : height - 370
        }
        style={{ marginTop: height > 800 ? "25px" : "20px" }}
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=saint%20tropez%20beach%20mamaia&t=z=11&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        className={styles.weatherFrame}
        marginWidth="0"
      ></iframe>
    </>
  );
};

export default Weather;
