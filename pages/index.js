import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Homepage from "../components/homepage/home";
import { useState } from "react";
import Menu from "../components/menu/Menu";
import Gallery from "../components/gallery/gallery";
import Schedule from "../components/schedule/schedule";
import About from "../components/about/about";

export default function Home() {
  const [pressHome, setPressHome] = useState(true);
  const [pressMenu, setPressMenu] = useState(false);
  const [pressSchedule, setPressSchedule] = useState(false);
  const [pressGallery, setPressGalery] = useState(false);
  const [pressAbout, setPressAbout = false] = useState(false);

  const resetNavbar = () => {
    setPressHome(false);
    setPressMenu(false);
    setPressSchedule(false);
    setPressGalery(false);
    setPressAbout(false);
  };

  const pressed = {
    rotate: 45,
    y: -55,
    outline: "5px solid rgba(84, 171, 183, 1)",
  };

  const pressedLast = {
    rotate: 45,
    y: -55,
    scale: 0.9,
    outline: "5px solid rgba(84, 171, 183, 1)",
  };

  const unpressed = {
    rotate: 0,
    y: 0,
    scale: 1,
    outline: "none",
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Saint Tropez Beach - Acasa</title>
      </Head>
      <div className={styles.backgroundImage}></div>
      <div className={styles.header}>
        <div
          className={styles.logoSpace}
          onClick={() => {
            resetNavbar();
            setPressHome(true);
          }}
        >
          <Image src={"/static/logo.png"} alt="" layout="fill" />
        </div>
      </div>

      {pressHome ? <Homepage /> : null}
      {pressMenu ? <Menu /> : null}
      {pressSchedule ? <Schedule /> : null}
      {pressGallery ? <Gallery /> : null}
      {pressAbout ? <About /> : null}

      <div className={styles.navbar}>
        <div className={styles.navbarItem}>
          <motion.p
            className={pressHome ? styles.navbarTextPressed : styles.navbarText}
            animate={{
              y: pressHome ? 50 : 0,
            }}
          >
            ACASA
          </motion.p>
          <motion.button
            className={styles.navbarButton}
            animate={pressHome ? pressedLast : unpressed}
            onClick={() => {
              resetNavbar();
              setPressHome(true);
            }}
          >
            <motion.div
              className={styles.navbarAlo}
              animate={{
                rotate: pressHome ? -45 : 0,
              }}
            >
              <Image src={"/static/home.svg"} alt="" layout="fill" />
            </motion.div>
          </motion.button>
        </div>
        <div className={styles.navbarItem}>
          <motion.p
            className={
              pressSchedule ? styles.navbarTextPressed : styles.navbarText
            }
            animate={{
              y: pressSchedule ? 50 : 0,
            }}
          >
            PROGRAM
          </motion.p>
          <motion.button
            className={styles.navbarButton}
            style
            animate={pressSchedule ? pressed : unpressed}
            onClick={() => {
              resetNavbar();
              setPressSchedule(true);
            }}
          >
            <motion.div
              className={styles.navbarAlo}
              animate={{
                rotate: pressSchedule ? -45 : 0,
              }}
            >
              <Image src={"/static/calendar.svg"} alt="" layout="fill" />
            </motion.div>
          </motion.button>
        </div>
        <div className={styles.navbarItem}>
          <motion.p
            className={pressMenu ? styles.navbarTextPressed : styles.navbarText}
            animate={{
              y: pressMenu ? 50 : 0,
            }}
          >
            MENIU
          </motion.p>
          <motion.button
            className={styles.navbarButton}
            animate={pressMenu ? pressed : unpressed}
            onClick={() => {
              resetNavbar();
              setPressMenu(true);
            }}
          >
            <motion.div
              className={styles.navbarAlo}
              animate={{
                rotate: pressMenu ? -45 : 0,
              }}
            >
              <Image src={"/static/menu.svg"} alt="" layout="fill" />
            </motion.div>
          </motion.button>
        </div>
        <div className={styles.navbarItem}>
          <motion.p
            className={
              pressGallery ? styles.navbarTextPressed : styles.navbarText
            }
            animate={{
              y: pressGallery ? 50 : 0,
            }}
          >
            GALERIE
          </motion.p>
          <motion.button
            className={styles.navbarButton}
            animate={pressGallery ? pressed : unpressed}
            onClick={() => {
              resetNavbar();
              setPressGalery(true);
            }}
          >
            <motion.div
              className={styles.navbarAlo}
              animate={{
                rotate: pressGallery ? -45 : 0,
              }}
            >
              <Image src={"/static/gallery.svg"} alt="" layout="fill" />
            </motion.div>
          </motion.button>
        </div>
        <div className={styles.navbarItem}>
          <motion.p
            className={
              pressAbout ? styles.navbarTextPressed : styles.navbarText
            }
            animate={{
              y: pressAbout ? 50 : 0,
            }}
          >
            DESPRE
          </motion.p>
          <motion.button
            className={styles.navbarButton}
            animate={pressAbout ? pressedLast : unpressed}
            onClick={() => {
              resetNavbar();
              setPressAbout(true);
            }}
          >
            <motion.div
              className={styles.navbarAlo}
              animate={{
                rotate: pressAbout ? -45 : 0,
              }}
            >
              <Image src={"/static/about.svg"} alt="" layout="fill" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
