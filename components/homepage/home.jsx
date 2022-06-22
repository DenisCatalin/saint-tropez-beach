import React from "react";

import styles from "./Homepage.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Weather from "../weather/weather";
import Link from "next/link";

const Home = () => {
  return (
    <motion.div className={styles.container} animate={{ scale: [0, 1] }}>
      <div className={styles.socialMedia}>
        <motion.button
          className={styles.social}
          whileTap={{
            scale: 0.8,
          }}
        >
          <Image
            src={"/static/facebook.svg"}
            alt="Facebook"
            width={25}
            height={25}
          />
        </motion.button>
        <motion.button
          className={styles.social}
          whileTap={{
            scale: 0.8,
          }}
        >
          <Image
            src={"/static/instagram.svg"}
            alt="Instagram"
            width={25}
            height={25}
          />
        </motion.button>
        <motion.button
          className={styles.social}
          whileTap={{
            scale: 0.8,
          }}
        >
          <Link href="tel:0721828383">
            <a>
              <Image
                src={"/static/phone.svg"}
                alt="Twitter"
                width={25}
                height={25}
              />
            </a>
          </Link>
        </motion.button>
      </div>
      <Weather />
    </motion.div>
  );
};

export default Home;
