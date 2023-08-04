import React from "react";
import styles from "./Gallery.module.css";
import { getImages } from "../../lib/gallery";
import { motion } from "framer-motion";
import Modal from "react-modal";
Modal.setAppElement("#__next");
import Photo from "../getPhoto/image";

const Gallery = () => {
  const images = getImages();
  return (
    <>
      <motion.div className={styles.container} animate={{ scale: [0, 1] }}>
        {images.map(item => (
          <Photo url={item?.url} key={item?.id} />
        ))}
      </motion.div>
    </>
  );
};

export default Gallery;
