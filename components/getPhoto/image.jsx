import styles from "./Image.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const Photo = ({ url }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.photo} onClick={() => setOpen(!open)}>
        <Image
          src={url}
          className={styles.image}
          alt=""
          layout="fill"
          priority
        />
      </div>
      <Modal
        isOpen={open}
        className={styles.modal}
        contentLabel="View Order"
        overlayClassName={styles.overlay}
      >
        <div className={styles.posAbs}>
          <button className={styles.closeModal} onClick={() => setOpen(false)}>
            X
          </button>
        </div>
        <Image src={url} className={styles.image} alt="" layout="fill" />
      </Modal>
    </>
  );
};

export default Photo;
