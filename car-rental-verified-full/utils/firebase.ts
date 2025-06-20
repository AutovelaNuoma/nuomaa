import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "PAKEISK_API_KEY",
  authDomain: "PAKEISK_AUTH_DOMAIN",
  databaseURL: "PAKEISK_DATABASE_URL",
  projectId: "PAKEISK_PROJECT_ID",
  storageBucket: "PAKEISK_STORAGE_BUCKET",
  messagingSenderId: "PAKEISK_SENDER_ID",
  appId: "PAKEISK_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
