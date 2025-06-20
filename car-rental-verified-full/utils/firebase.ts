import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBD8p00I8DBAS_yJ9vXCs1BkxWh3vSrxTU",
  authDomain: "automobiliu-nuoma.firebaseapp.com",
  projectId: "automobiliu-nuoma",
  storageBucket: "automobiliu-nuoma.firebasestorage.app",
  messagingSenderId: "465502032588",
  appId: "1:465502032588:web:3d549237af6c4903362869",
  measurementId: "G-V7E37P3HZ1"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
