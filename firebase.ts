import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTewBRQx6YU3cquxWn-Hx4WEPlQros-Wo",
  authDomain: "dropbox-clone-e391d.firebaseapp.com",
  projectId: "dropbox-clone-e391d",
  storageBucket: "dropbox-clone-e391d.appspot.com",
  messagingSenderId: "182224000527",
  appId: "1:182224000527:web:5b98716a9e12c8d3a1f57a"
};

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };