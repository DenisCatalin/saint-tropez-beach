import styles from "./Menu.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { getRacoritoare, getBere, getCafea } from "../../lib/menu";

const Menu = () => {
  const [showCategories, setShowCategories] = useState(false);

  const racoritoare = getRacoritoare();
  const bere = getBere();
  const cafea = getCafea();

  return (
    <motion.div className={styles.container} animate={{ scale: [0, 1] }}>
      <button
        className={styles.burger}
        onClick={() => setShowCategories(!showCategories)}
      >
        {showCategories ? (
          <>
            <h1 style={{ color: "#eee", fontSize: "3em" }}>X</h1>
          </>
        ) : (
          <>
            <div className={styles.burgerLine1}></div>
            <div className={styles.burgerLine2}></div>
            <div className={styles.burgerLine3}></div>
          </>
        )}
      </button>
      <motion.div
        className={styles.navbarMenu}
        animate={{ scale: showCategories ? 1 : 0 }}
      >
        <ul className={styles.navbarMenuList}>
          <Link href={"#racoritoare"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Racoritoare</li>
            </a>
          </Link>
          <Link href={"#bere"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Bere</li>
            </a>
          </Link>
          <Link href={"#cafea"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Cafea</li>
            </a>
          </Link>
        </ul>
      </motion.div>
      <div className={styles.overflow}>
        <section className={styles.category} id="racoritoare">
          <h2 className={styles.categoryName}>Racoritoare</h2>
          {racoritoare.map((item, i) => (
            <div className={styles.menuItem} key={i}>
              <div className={styles.itemName}>
                <h2 className={styles.textProd}>{item.numeProdus}</h2>
                <h2 className={styles.textProd}>{item.pretProdus} RON</h2>
              </div>
              <div className={styles.itemDescription}>
                {item.descriereProdus}
              </div>
            </div>
          ))}
        </section>
        <section className={styles.category} id="bere">
          <h2 className={styles.categoryName}>Bere</h2>
          {bere.map((item, i) => (
            <div className={styles.menuItem} key={i}>
              <div className={styles.itemName}>
                <h2 className={styles.textProd}>{item.numeProdus}</h2>
                <h2 className={styles.textProd}>{item.pretProdus} RON</h2>
              </div>
              <div className={styles.itemDescription}>
                {item.descriereProdus}
              </div>
            </div>
          ))}
        </section>
        <section className={styles.category} id="cafea">
          <h2 className={styles.categoryName}>Cafea</h2>
          {cafea.map((item, i) => (
            <div className={styles.menuItem} key={i}>
              <div className={styles.itemName}>
                <h2 className={styles.textProd}>{item.numeProdus}</h2>
                <h2 className={styles.textProd}>{item.pretProdus} RON</h2>
              </div>
              <div className={styles.itemDescription}>
                {item.descriereProdus}
              </div>
            </div>
          ))}
        </section>
      </div>
    </motion.div>
  );
};

export default Menu;
