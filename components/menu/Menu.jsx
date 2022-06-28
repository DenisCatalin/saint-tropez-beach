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
  getSpirits,
  getBered,
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
  const bered = getBered();
  const spirits = getSpirits();

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
              <li onClick={() => setShowCategories(false)}>
                Bauturi Racoritoare
              </li>
            </a>
          </Link>
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
          <Link href={"#bered"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Bere Draught</li>
            </a>
          </Link>
          <Link href={"#fresh"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Fresh/Limonada</li>
            </a>
          </Link>
          <Link href={"#vin"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Vinuri</li>
            </a>
          </Link>
          <Link href={"#cocktail"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Cocktails</li>
            </a>
          </Link>
          <Link href={"#shot"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Spirits</li>
            </a>
          </Link>
          <Link href={"#shot"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Shots</li>
            </a>
          </Link>
        </ul>
      </motion.div>
      <div className={styles.overflow}>
        <section className={styles.category} id="racoritoare">
          <h2 className={styles.categoryName}>Bauturi Racoritoare</h2>
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
        <section className={styles.category} id="bered">
          <h2 className={styles.categoryName}>Bere Draught</h2>
          {bered.map((item, i) => (
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
        <section className={styles.category} id="vin">
          <h2 className={styles.categoryName}>Vinuri</h2>
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
        <section className={styles.category} id="cocktail">
          <h2 className={styles.categoryName}>Cocktails</h2>
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
        <section className={styles.category} id="spirits">
          <h2 className={styles.categoryName}>Spirits</h2>
          {spirits.map((item, i) => (
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
      </div>
    </motion.div>
  );
};

export default Menu;
