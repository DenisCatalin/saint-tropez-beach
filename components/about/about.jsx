import React from "react";
import Image from "next/image";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <div className={styles.img}>
          <Image src={"/static/test.jpg"} alt="" layout="fill" />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>Alex Scarlat</div>
          <div className={styles.title}>CAZAN</div>
          <div className={styles.social}>
            <div className={styles.socialIcon}>
              <Image
                src={"/static/facebook-dark.svg"}
                class
                alt=""
                width="150"
                height="150"
              />
            </div>
            <div className={styles.socialIcon}>
              <Image
                src={"/static/instagram-dark.svg"}
                class
                alt=""
                width="150"
                height="150"
              />
            </div>
            <div className={styles.socialIcon}>
              <Image
                src={"/static/twitter-dark.svg"}
                class
                alt=""
                width="150"
                height="150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
