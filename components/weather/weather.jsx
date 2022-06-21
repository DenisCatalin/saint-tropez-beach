import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Weather.module.css";

const Weather = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async function fetchData() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Mamaia&units=Metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      if (data.message === undefined) setData(data);
      else setData(data.message);
      console.log(data.main);
    })();
  }, []);
  return (
    <>
      <div className={styles.temperatureContainer}>
        <div className={styles.temperatureContent}>
          <h2>{data?.name}</h2>
          <h2>{data?.main?.feels_like.toFixed(1)}°C</h2>
        </div>
        <div className={styles.temperatureIcon}>
          <Image src={"/static/01d.png"} alt="" layout="fill" />
        </div>
        <div className={styles.temperatureLiquid}></div>
      </div>
      <div className={styles.mapouter}>
        <div className={styles.gmap_canvas}>
          <iframe
            width="350"
            height="350"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=saint%20tropez%20beach%20mamaia&t=z=11&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Weather;
