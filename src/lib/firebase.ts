import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
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

// Initialize Firestore with experimentalForceLongPolling to prevent backend disconnects
// in sandboxed iframe environments where WebSockets may be blocked or dropped.
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (_) {
  db = getFirestore(app);
}

const auth = getAuth(app);

export { app, db, auth };
export default app;
