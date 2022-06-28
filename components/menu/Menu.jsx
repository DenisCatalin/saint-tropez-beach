import styles from "./Menu.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  getRacoritoare,
  getBere,
  getCafea,
  getCocktail,
  getFresh,
  getShot,
  getVin,
} from "../../lib/menu";

const Menu = () => {
  const [showCategories, setShowCategories] = useState(false);

  const racoritoare = getRacoritoare();
  const bere = getBere();
  const cafea = getCafea();
  const cocktail = getCocktail();
  const fresh = getFresh();
  const shot = getShot();
  const vin = getVin();

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
          <Link href={"#fresh"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Fresh/Limonada</li>
            </a>
          </Link>
          <Link href={"#racoritoare"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Racoritoare</li>
            </a>
          </Link>
          <Link href={"#cocktail"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Cocktail</li>
            </a>
          </Link>
          {/* <Link href={"#alcool"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Alcool</li>
            </a>
          </Link> */}
          <Link href={"#cafea"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Cafea</li>
            </a>
          </Link>
          <Link href={"#bere"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Bere</li>
            </a>
          </Link>
          <Link href={"#shot"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Shot</li>
            </a>
          </Link>
          <Link href={"#vin"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Vin</li>
            </a>
          </Link>
        </ul>
      </motion.div>
      <div className={styles.overflow}>
        <section className={styles.category} id="fresh">
          <h2 className={styles.categoryName}>Fresh/Limonada</h2>
          {fresh.map((item, i) => (
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
        <section className={styles.category} id="cocktail">
          <h2 className={styles.categoryName}>Cocktail</h2>
          {cocktail.map((item, i) => (
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
        <section className={styles.category} id="shot">
          <h2 className={styles.categoryName}>Shot</h2>
          {shot.map((item, i) => (
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
        <section className={styles.category} id="vin">
          <h2 className={styles.categoryName}>Vin</h2>
          {vin.map((item, i) => (
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
