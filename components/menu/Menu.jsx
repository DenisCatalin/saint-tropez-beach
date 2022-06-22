import styles from "./Menu.module.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRacoritoare, getCategories } from "../../lib/menu";
import Cookies from "js-cookie";

const Menu = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductDesc, setInputProductDesc] = useState("");
  const [inputProductCateg, setInputProductCateg] = useState("");
  // const [getLogged, setGetLogged] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [itemID, setItemID] = useState(null);
  const [addItem, setAddItem] = useState(false);

  const racoritoare = getRacoritoare();
  const category = getCategories();

  let categArray = [];

  useEffect(() => {
    setMenuList(racoritoare);
  }, []);

  useEffect(() => {
    console.log("re-render");
  }, [inputProductName]);

  // useEffect(() => {
  //   (async function () {
  //     Cookies.set("logged", false);
  //     setGetLogged(JSON.parse(Cookies.get("logged")));
  //   })();
  // }, []);

  useEffect(() => {
    categArray = menuList.filter(
      (item) => item.categorieProdus === "racoritoare"
    );
  }, [categArray]);

  const addMenuItem = async () => {
    const res = await fetch("/api/updateMenu", {
      headers: {
        body: JSON.stringify({
          numeProdus: inputProductName,
          descriereProdus: inputProductDesc,
          pretProdus: inputProductPrice,
          categorieProdus: inputProductCateg,
          method: "add",
        }),
      },
    });
    const data = await res.json();
    console.log(data);
    setAddItem(false);
    setShowEdit(false);
  };

  const editMenuItem = async () => {
    const res = await fetch("/api/updateMenu", {
      headers: {
        body: JSON.stringify({
          numeProdus: inputProductName,
          pretProdus: inputProductPrice,
          descriereProdus: inputProductDesc,
          categorieProdus: inputProductCateg,
          itemID: itemID,
          method: "update",
        }),
      },
    });
    const data = await res.json();
    console.log(data);
    setShowEdit(false);
  };

  const deleteMenuItem = async () => {
    const res = await fetch("/api/updateMenu", {
      headers: {
        body: JSON.stringify({
          numeProdus: inputProductName,
          categorieProdus: inputProductCateg,
          method: "delete",
        }),
      },
    });
    const data = await res.json();
    console.log(data);
  };
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
          <Link href={"#1"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Racoritoare</li>
            </a>
          </Link>
          <Link href={"#2"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>Cocktail-uri</li>
            </a>
          </Link>
          <Link href={"#test"}>
            <a className={styles.navbarLink}>
              <li onClick={() => setShowCategories(false)}>
                Bauturi Alcoolice
              </li>
            </a>
          </Link>
        </ul>
      </motion.div>
      {/* {getLogged ? (
        <>
          <motion.div
            className={styles.inputContainer}
            animate={{ scale: showEdit ? 1 : 0 }}
          >
            <div className={styles.inputSpace}>
              <h1 className={styles.labelEdit}>Nume produs</h1>
              <input
                type="text"
                className={styles.input}
                value={inputProductName}
                onChange={(e) => setInputProductName(e.target.value)}
              />
            </div>
            <div className={styles.areaSpace}>
              <h1 className={styles.labelEdit}>Descriere produs</h1>
              <input
                type="text"
                className={styles.ainput}
                value={inputProductDesc}
                onChange={(e) => setInputProductDesc(e.target.value)}
              />
            </div>
            <div className={styles.inputSpace}>
              <h1 className={styles.labelEdit}>Pret produs</h1>
              <input
                type="text"
                className={styles.input}
                value={inputProductPrice}
                onChange={(e) => setInputProductPrice(e.target.value)}
              />
            </div>
            <div className={styles.inputSpace}>
              <select
                name="category-list"
                id="category-list"
                onChange={(e) => setInputProductCateg(e.target.value)}
              >
                <option value="Racoritoare">Racoritoare</option>
                <option value="Bauturi Alcoolice">Bauturi Alcoolice</option>
              </select>
            </div>
            <button
              className={styles.editProd}
              onClick={addItem ? addMenuItem : editMenuItem}
            >
              {addItem ? "Adauga" : "Editeaza"}
            </button>
          </motion.div>
        </>
      ) : null} */}
      <div className={styles.overflow}>
        {/* {getLogged ? (
          <>
            <button className={styles.editButton}>
              {showEdit ? (
                <h1
                  style={{ color: "#eee", fontSize: "3em" }}
                  onClick={() => setShowEdit(!showEdit)}
                >
                  X
                </h1>
              ) : (
                <Image
                  src={"/static/add.svg"}
                  alt=""
                  width={50}
                  height={40}
                  onClick={() => {
                    setShowEdit(!showEdit);
                    setAddItem(true);
                    setInputProductName("");
                    setInputProductPrice("");
                    setInputProductDesc("");
                    setInputProductCateg("Racoritoare");
                  }}
                />
              )}
            </button>
          </>
        ) : null} */}
        <section className={styles.category} id="racoritoare">
          <h2 className={styles.categoryName}>Racoritoare</h2>
          {racoritoare.map((item, i) => (
            <div className={styles.menuItem} key={i}>
              <div className={styles.itemName}>
                <h2>{item.numeProdus}</h2>
                {/* {getLogged ? (
                    <>
                      <div
                        className={styles.directProductEdit}
                        onClick={() => {
                          setInputProductName(item.numeProdus);
                          setInputProductPrice(item.pretProdus);
                          setInputProductDesc(item.descriereProdus);
                          setInputProductCateg(item.categorieProdus);
                          setItemID(i);
                          setShowEdit(!showEdit);
                          setAddItem(false);
                        }}
                      >
                        <Image
                          src={"/static/edit.svg"}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <h2
                        className={styles.directDeleteProduct}
                        onClick={() => {
                          setInputProductName(item.numeProdus);
                          setInputProductCateg(item.categorieProdus);
                          deleteMenuItem();
                        }}
                      >
                        <Image
                          src={"/static/close.svg"}
                          alt=""
                          width={30}
                          height={30}
                        />
                      </h2>
                    </>
                  ) : null} */}
                <h2>{item.pretProdus} RON</h2>
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
