import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Homepage from "../components/homepage/home";
import { useState, useEffect } from "react";
import Menu from "../components/menu/Menu";
import Gallery from "../components/gallery/gallery";
import Schedule from "../components/schedule/schedule";
import About from "../components/about/about";
import useWindowDimensions from "../utils/useWindowDimensions";
import { isIOS } from "react-device-detect";
import firebase from '../utils/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector, useDispatch } from "react-redux";
import { initialState, setUserState } from "../redux/user.slice";
import BERE from '../data/b2.json'
import Avatar from '@mui/material/Avatar';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

// 320 x 449

export default function Home() {
  const userRedux = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [pressHome, setPressHome] = useState(false);
  const [pressMenu, setPressMenu] = useState(true);
  const [pressSchedule, setPressSchedule] = useState(false);
  const [pressGallery, setPressGalery] = useState(false);
  const [pressAbout, setPressAbout = false] = useState(false);


  const firestore = firebase.firestore();
  const Ref = firestore.collection("bere");
  // const queryProducatori = Ref.orderBy("id");
  // const [producatori] = useCollectionData(queryProducatori, { id: "id" });

  async function addToFirebase() {
    BERE.forEach(async item => {
      await Ref.add({
        nume: item.numeProdus,
        pret: item.pretProdus,
        descriere: item.descriereProdus,
      });
    });
  }

  
  // async function deleteAllDocuments() {
  //   const db = firebase.firestore();
  //   const obiectiveRef = db.collection("producatori2");

  //   const querySnapshot = await obiectiveRef.get();

  //   const batch = db.batch();
  //   querySnapshot.forEach(doc => {
  //     batch.delete(doc.ref);
  //   });
  //   await batch.commit();
  // }

  useEffect(() => {
    (async () => {
      // await addToFirebase();
      // await deleteAllDocuments();
    })();
  }, []);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { height, width } = useWindowDimensions();

  const pressed = {
    rotate: 45,
    y: height > 750 ? -55 : -40,
    outline: isIOS ? "none" : "5px solid rgba(84, 171, 183, 1)",
  };

  const pressedLast = {
    rotate: 45,
    y: height > 750 ? -55 : -40,
    scale: 0.9,
    outline: isIOS ? "none" : "5px solid rgba(84, 171, 183, 1)",
  };

  const unpressed = {
    rotate: 0,
    y: 0,
    scale: 1,
    outline: "none",
  };

  const resetNavbar = () => {
    setPressHome(false);
    setPressMenu(false);
    setPressSchedule(false);
    setPressGalery(false);
    setPressAbout(false);
  };

    async function getDocumentIdByFieldValue(field, value, collection) {
    try {
      const querySnapshot = await firestore.collection(collection).where(field, "==", value).get();
      if (querySnapshot.empty) {
        console.log(`No documents found with ${field} equal to ${value}.`);
        return null;
      } else {
        const document = querySnapshot.docs[0];
        console.log(`Document data:`, document.data());
        return document.id;
      }
    } catch (error) {
      console.error(`Error getting document with ${field} equal to ${value}:`, error);
      return null;
    }
  }

  useEffect(() => {
    if(userRedux.logged === true) {
      console.log("logged")
    }
  }, [userRedux])

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const { uid, displayName, email, photoURL } = result.user;
    const usersRef = firestore.collection('users');

    try {
      const userDoc = await usersRef.doc(uid).get();
      if (userDoc.exists) {
        const data = userDoc.data();
        const toSet = {
          data,
          logged: true
        }
        dispatch(setUserState(toSet))
      } else {
        await usersRef.doc(uid).set({
          uid,
          displayName,
          email,
          photoURL,
          admin: false,
        });
      }
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  }


  const signOut = () => {
    auth.signOut();
    dispatch(setUserState(initialState.user));
    handleClose();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Saint Tropez Beach - Acasa</title>
      </Head>
      <div className={styles.backgroundImage}>
        <Image src={"/static/palmTree.png"} alt="" layout="fill" />
      </div>
      <div className={styles.header}>
        <div
          className={styles.logoSpace}
          onClick={() => {
            resetNavbar();
            setPressHome(true);
          }}
        >
          <Image src={"/static/log00.png"} alt="" layout="fill" priority />
        </div>
        <div className={styles.login}>
          {userRedux.logged ? <Avatar id="beach-menu" onClick={handleClick}  src={userRedux.data.photoURL} /> : <Avatar onClick={signIn} src={userRedux.data.photoURL}><PersonIcon htmlColor="#fff"/></Avatar>}
          <MuiMenu
            id="beach-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MuiMenuItem onClick={signOut}>Logout</MuiMenuItem>
          </MuiMenu>
          {/* <Image src={"/static/add.svg"} alt="" width={30} height={30} onClick={userRedux.logged ? signOut : signIn} /> */}
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
              y: pressHome ? (height > 750 ? 50 : width / 10) : 0,
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
              y: pressSchedule ? (height > 750 ? 50 : width / 10) : 0,
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
              y: pressMenu ? (height > 750 ? 50 : width / 10) : 0,
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
              y: pressGallery ? (height > 750 ? 50 : width / 10) : 0,
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
              y: pressAbout ? (height > 750 ? 50 : width / 10) : 0,
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
