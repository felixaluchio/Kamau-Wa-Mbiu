import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN-9Yp6AZz1gfu5rBQNr3y3yc7etw_yB0",
  authDomain: "kamau-wa-mbiu.firebaseapp.com",
  projectId: "kamau-wa-mbiu",
  storageBucket: "kamau-wa-mbiu.firebasestorage.app",
  messagingSenderId: "1033750010298",
  appId: "1:1033750010298:web:6dd91a85618cac5b2c2583"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
export default app;
