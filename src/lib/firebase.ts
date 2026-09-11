import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  setLogLevel 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Suppress Firestore verbose offline connection retry logs in console
try {
  setLogLevel('error');
} catch (_) {}

const firebaseConfig = {
  apiKey: "AIzaSyAN-9Yp6AZz1gfu5rBQNr3y3yc7etw_yB0",
  authDomain: "kamau-wa-mbiu.firebaseapp.com",
  projectId: "kamau-wa-mbiu",
  storageBucket: "kamau-wa-mbiu.firebasestorage.app",
  messagingSenderId: "1033750010298",
  appId: "1:1033750010298:web:6dd91a85618cac5b2c2583"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with auto-detect long polling and multi-tab persistent cache
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
} catch (_) {
  try {
    db = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
    });
  } catch (_err) {
    db = getFirestore(app);
  }
}

const auth = getAuth(app);

export { app, db, auth };
export default app;
