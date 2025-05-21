// firebase.ts

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDP4FvrxWNv29YriH9luc2Lvcbl7R6DzMc",
  authDomain: "abrar-shop.firebaseapp.com",
  projectId: "abrar-shop",
  storageBucket: "abrar-shop.appspot.com",
  messagingSenderId: "375392958324",
  appId: "1:375392958324:web:539f950d847881c62d1e21"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
