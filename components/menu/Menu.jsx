import styles from "./Menu.module.css";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import firebase from "../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const Menu = () => {
  const firestore = firebase.firestore();
  const meniu = firestore.collection("meniu");
  const queryCategorii = meniu.orderBy("categorie");
  const [categoriiMeniu] = useCollectionData(queryCategorii, { categorie: "categorie" });

  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [documentID, setDocumentID] = useState("");
  const [currentItem, setCurrentItem] = useState({});

  const itemName = useRef(null);
  const itemDescription = useRef(null);
  const itemPrice = useRef(null);
  const inputCategory = useRef(null);
  const inputEditCategory = useRef(null);

  const userRedux = useSelector(state => state.user.user);

  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = useState(false);
  const handleOpenDeleteCategoryDialog = category => {
    setCurrentCategory(category);
    setOpenDeleteCategoryDialog(true);
  };
  const handleCloseDeleteCategoryDialog = () => setOpenDeleteCategoryDialog(false);

  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const handleOpenAddCategoryDialog = () => setOpenAddCategoryDialog(true);
  const handleCloseAddCategoryDialog = () => setOpenAddCategoryDialog(false);

  const [openAddItemInCategoryDialog, setOpenAddItemInCategoryDialog] = useState(false);
  const handleOpenAddItemInCategoryDialog = async categorie => {
    await getDocumentIdByFieldValue("categorie", categorie);
    setCurrentCategory(categorie);
    setOpenAddItemInCategoryDialog(true);
  };

  const handleCloseAddItemInCategory = () => {
    setCurrentCategory("");
    setOpenAddItemInCategoryDialog(false);
  };

  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);
  const handleOpenEditCategoryDialog = categorie => {
    setCurrentCategory(categorie);
    setOpenEditCategoryDialog(true);
  };
  const handleCloseEditCategoryDialog = () => setOpenEditCategoryDialog(false);

  const [openEditItemDialog, setOpenEditItemDialog] = useState(false);
  const handleOpenEditItemDialog = async (item, category) => {
    await getDocumentIdByFieldValue("categorie", category);
    setCurrentItem(item);
    setCurrentCategory(category);
    setOpenEditItemDialog(true);
  };
  const handleCloseEditItemDialog = () => setOpenEditItemDialog(false);

  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);
  const handleOpenDeleteItemDialog = async (item, category) => {
    await getDocumentIdByFieldValue("categorie", category);
    setCurrentItem(item);
    setCurrentCategory(category);
    setOpenDeleteItemDialog(true);
  };
  const handleCloseDeleteItemDialog = () => setOpenDeleteItemDialog(false);

  useEffect(() => {
    if (categoriiMeniu) {
      setCategories([]);
      categoriiMeniu.map(categ => {
        setCategories(prev => [...prev, categ]);
      });
    }
  }, [categoriiMeniu]);

  async function getDocumentIdByFieldValue(field, value) {
    try {
      const querySnapshot = await firestore.collection("meniu").where(field, "==", value).get();
      if (querySnapshot.empty) {
        console.log(`No documents found with ${field} equal to ${value}.`);
        return null;
      } else {
        const document = querySnapshot.docs[0];
        if (field === "categorie") {
          setProducts(document.data().produse);
        }
        setDocumentID(document.id);
        return document.id;
      }
    } catch (error) {
      console.error(`Error getting document with ${field} equal to ${value}:`, error);
      return null;
    }
  }

  const addNewCategoryMenu = async () => {
    if (inputCategory.current.value.length === 0) return;
    await meniu.add({
      categorie: inputCategory.current.value,
      produse: [],
    });

    handleCloseAddCategoryDialog();
  };

  const addItemInCategory = async () => {
    if (
      itemName.current.value.length === 0 ||
      itemDescription.current.value.length === 0 ||
      itemPrice.current.value.length === 0
    )
      return;
    const docRef = meniu.doc(documentID);
    console.log("documentID: ", documentID);

    const itemToAdd = {
      numeProdus: itemName.current.value,
      descriereProdus: itemDescription.current.value,
      pretProdus: itemPrice.current.value,
    };

    let items = products;
    items.push(itemToAdd);
    console.log("items: ", items);

    await docRef
      .update({
        produse: items,
      })
      .then(() => {
        console.log("adaugat");
      })
      .catch(err => {
        console.log("n-am adaugat", err);
      });

    handleCloseAddItemInCategory();
  };

  const editCategory = async () => {
    if (inputEditCategory.current.value.length === 0) return;
    const actualID = await getDocumentIdByFieldValue("categorie", currentCategory);
    const docRef = meniu.doc(actualID);

    await docRef
      .update({
        categorie: inputEditCategory.current.value,
      })
      .then(() => {
        console.log("editat");
      })
      .catch(err => {
        console.log("n-am editat", err);
      });

    handleCloseEditCategoryDialog();
  };

  const deleteCategory = async category => {
    const actualID = await getDocumentIdByFieldValue("categorie", category);
    try {
      await firestore.collection("meniu").doc(actualID).delete();
      console.log(`Document with ID ${actualID} was successfully deleted.`);
    } catch (error) {
      console.error(`Error deleting document with ID ${actualID}:`, error);
    }
    handleCloseDeleteCategoryDialog();
  };

  const editItem = async () => {
    const actualID = await getDocumentIdByFieldValue("categorie", currentCategory);
    const docRef = meniu.doc(actualID);
    let items = products;

    const productIndexToUpdate = items.findIndex(
      product => product.numeProdus === currentItem.numeProdus
    );
    if (productIndexToUpdate !== -1) {
      items[productIndexToUpdate] = {
        ...items[productIndexToUpdate],
        numeProdus: itemName.current.value,
        descriereProdus: itemDescription.current.value,
        pretProdus: itemPrice.current.value,
      };
    }

    await docRef
      .update({
        produse: items,
      })
      .then(() => {
        console.log("adaugat");
      })
      .catch(err => {
        console.log("n-am adaugat", err);
      });

    handleCloseEditItemDialog();
  };

  const deleteItem = async () => {
    const actualID = await getDocumentIdByFieldValue("categorie", currentCategory);
    const docRef = meniu.doc(actualID);
    let items = products;

    const productIndexToDeletee = items.filter(
      product => product.numeProdus !== currentItem.numeProdus
    );

    await docRef
      .update({
        produse: productIndexToDeletee,
      })
      .then(() => {
        console.log("adaugat");
      })
      .catch(err => {
        console.log("n-am adaugat", err);
      });

    handleCloseDeleteItemDialog();
  };

  return (
    <motion.div className={styles.container} animate={{ scale: [0, 1] }}>
      <button className={styles.burger} onClick={() => setShowCategories(!showCategories)}>
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
      <motion.div className={styles.navbarMenu} animate={{ scale: showCategories ? 1 : 0 }}>
        <ul className={styles.navbarMenuList}>
          {categories &&
            categories?.map(categorie => (
              <Link href={`#${categorie.categorie}`} key={categorie.categorie}>
                <a className={styles.navbarLink}>
                  <li onClick={() => setShowCategories(false)}>{categorie.categorie}</li>
                </a>
              </Link>
            ))}
        </ul>
      </motion.div>
      {userRedux.data.admin === true && (
        <button className={styles.addCategory} onClick={handleOpenAddCategoryDialog}>
          <Image src={"/static/add.svg"} width={30} height={30} /> Adauga categorie
        </button>
      )}
      <div className={styles.overflow}>
        {categories &&
          categories?.map(categorie => (
            <section className={styles.category} id={categorie.categorie} key={categorie.categorie}>
              <div className={styles.categoryName}>
                <h2>{categorie.categorie}</h2>
                {userRedux.data.admin === true && (
                  <div>
                    <button
                      className={styles.buttonCategory}
                      onClick={() => handleOpenAddItemInCategoryDialog(categorie.categorie)}
                    >
                      <AddIcon htmlColor="var(--darkColor)" />
                    </button>
                    <button
                      className={styles.buttonCategory}
                      onClick={() => handleOpenEditCategoryDialog(categorie.categorie)}
                    >
                      <ModeEditIcon htmlColor="var(--darkColor)" />
                    </button>
                    <button
                      className={styles.buttonCategory}
                      onClick={() => handleOpenDeleteCategoryDialog(categorie.categorie)}
                    >
                      <DeleteIcon htmlColor="var(--darkColor)" />
                    </button>
                  </div>
                )}
              </div>
              {categorie.produse.map((item, i) => (
                <div className={styles.menuItem} key={i}>
                  {userRedux.data.admin === true && (
                    <div className={styles.hoverOnItem}>
                      <button
                        className={styles.buttonCategory}
                        onClick={() => handleOpenEditItemDialog(item, categorie.categorie)}
                      >
                        <ModeEditIcon htmlColor="var(--darkColor)" />
                      </button>
                      <button
                        className={styles.buttonCategory}
                        onClick={() => handleOpenDeleteItemDialog(item, categorie.categorie)}
                      >
                        <DeleteIcon htmlColor="var(--darkColor)" />
                      </button>
                    </div>
                  )}
                  <div className={styles.itemName}>
                    <h2 className={styles.textProd}>{item.numeProdus}</h2>
                    <h2 className={styles.textProd}>{item.pretProdus} RON</h2>
                  </div>
                  <div className={styles.itemDescription}>{item.descriereProdus}</div>
                </div>
              ))}
            </section>
          ))}
        <div className={styles.grmfp}>
          <Image src={"/static/grmfp.jpg"} alt="" layout="fill" />
        </div>
      </div>
      {/* delete item category */}
      <Dialog
        open={openDeleteItemDialog}
        onClose={handleCloseDeleteItemDialog}
        aria-labelledby="dialog-delete-item"
        aria-describedby="dialog-delete-item-description"
      >
        <DialogTitle id="dialog-delete-iteme" className={styles.menuDialog}>
          Stergere produs <span style={{ fontWeight: "bold" }}>{currentItem.numeProdus}</span>
        </DialogTitle>
        <DialogContentText
          className={styles.menuDialog}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Esti sigur ca doresti sa stergi acest produs?
          <span style={{ marginBottom: "2rem" }}></span>
          <h3>- nume: {currentItem.numeProdus}</h3>
          <h3>- descriere: {currentItem.descriereProdus}</h3>
          <h3>- pret: {currentItem.pretProdus}</h3>
        </DialogContentText>
        <DialogActions className={styles.menuDialog}>
          <Button style={{ color: "#999" }} onClick={handleCloseDeleteItemDialog}>
            renunta
          </Button>
          <Button style={{ color: "#eee" }} onClick={deleteItem} autoFocus>
            sterge
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit item category */}
      <Dialog
        open={openEditItemDialog}
        onClose={handleCloseEditItemDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={styles.menuDialog}>
          Editare produs <span style={{ fontWeight: "bold" }}>{currentItem.numeProdus}</span>
        </DialogTitle>
        <DialogContentText
          className={styles.menuDialog}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          In cazul in care doresti sa modifici numele categoriei, tot ce trebuie sa faci este sa
          tastezi numele dorit pentru categorie in campul de mai jos.
          <input
            type="text"
            placeholder={currentItem.numeProdus}
            className={styles.inputAddCategory}
            ref={itemName}
          />
          <textarea
            type="text"
            placeholder={currentItem.descriereProdus}
            className={styles.inputAddCategory}
            ref={itemDescription}
          />
          <input
            type="text"
            placeholder={currentItem.pretProdus}
            className={styles.inputAddCategory}
            ref={itemPrice}
          />
        </DialogContentText>
        <DialogActions className={styles.menuDialog}>
          <Button style={{ color: "#999" }} onClick={handleCloseEditItemDialog}>
            renunta
          </Button>
          <Button style={{ color: "#eee" }} onClick={editItem} autoFocus>
            modifica
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit category */}
      <Dialog
        open={openEditCategoryDialog}
        onClose={handleCloseEditCategoryDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={styles.menuDialog}>
          Editare categorie <span style={{ fontWeight: "bold" }}>{currentCategory}</span>
        </DialogTitle>
        <DialogContentText
          className={styles.menuDialog}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          In cazul in care doresti sa modifici numele categoriei, tot ce trebuie sa faci este sa
          tastezi numele dorit pentru categorie in campul de mai jos.
          <input
            type="text"
            placeholder={currentCategory}
            className={styles.inputAddCategory}
            ref={inputEditCategory}
          />
        </DialogContentText>
        <DialogActions className={styles.menuDialog}>
          <Button style={{ color: "#999" }} onClick={handleCloseEditCategoryDialog}>
            renunta
          </Button>
          <Button style={{ color: "#eee" }} onClick={() => editCategory(currentCategory)} autoFocus>
            modifica
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete category */}
      <Dialog
        open={openDeleteCategoryDialog}
        onClose={handleCloseDeleteCategoryDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={styles.menuDialog}>
          Stergere categorie <span style={{ fontWeight: "bold" }}>{currentCategory}</span>
        </DialogTitle>
        <DialogContentText
          className={styles.menuDialog}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            fontWeight: "900",
          }}
        >
          Aceasta actiune va sterge, pe langa categoria aleasa si toata produsele din aceasta. Esti
          sigur ca doresti sa stergi aceasta categorie?
        </DialogContentText>
        <DialogActions className={styles.menuDialog}>
          <Button style={{ color: "#999" }} onClick={handleCloseDeleteCategoryDialog}>
            renunta
          </Button>
          <Button
            style={{ color: "#eee" }}
            onClick={() => deleteCategory(currentCategory)}
            autoFocus
          >
            sterge
          </Button>
        </DialogActions>
      </Dialog>
      {/* add category */}
      <Dialog
        open={openAddCategoryDialog}
        onClose={handleCloseAddCategoryDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={styles.menuDialog} id="alert-dialog-title">
          {"Adauga categorie"}
        </DialogTitle>
        <DialogContentText
          className={styles.menuDialog}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Adauga mai jos numele categoriei pe care doresti sa o adaugi in meniu:
          <input
            type="text"
            placeholder="Nume categorie"
            className={styles.inputAddCategory}
            ref={inputCategory}
          />
        </DialogContentText>
        <DialogActions className={styles.menuDialog}>
          <Button style={{ color: "#999" }} onClick={handleCloseAddCategoryDialog}>
            renunta
          </Button>
          <Button style={{ color: "#eee" }} onClick={addNewCategoryMenu} autoFocus>
            adauga
          </Button>
        </DialogActions>
      </Dialog>
      {/* add item in category */}
      <Dialog
        open={openAddItemInCategoryDialog}
        onClose={handleCloseAddItemInCategory}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={styles.menuDialog}>
          Adauga produs in categoria <span style={{ fontWeight: "bold" }}>{currentCategory}</span>
        </DialogTitle>
        <DialogContentText
          className={styles.menuDialog}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Adauga mai jos detaliile pentru produsul pe care vrei sa-l adaugi:
          <input
            type="text"
            placeholder="Nume produs"
            className={styles.inputAddCategory}
            ref={itemName}
          />
          <textarea
            type="text"
            placeholder="Descriere produs"
            className={styles.inputAddCategory}
            ref={itemDescription}
          />
          <input
            type="text"
            placeholder="Pret produs"
            className={styles.inputAddCategory}
            ref={itemPrice}
          />
        </DialogContentText>
        <DialogActions className={styles.menuDialog}>
          <Button style={{ color: "#999" }} onClick={handleCloseAddItemInCategory}>
            renunta
          </Button>
          <Button
            style={{ color: "#eee" }}
            onClick={() => addItemInCategory(currentCategory)}
            autoFocus
          >
            adauga
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Menu;
