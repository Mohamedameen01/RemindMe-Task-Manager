import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDea_Kwz8pOLBDTpjQZYN40nn__qA2mB4E",
  authDomain: "remindme-641d6.firebaseapp.com",
  projectId: "remindme-641d6",
  storageBucket: "remindme-641d6.appspot.com",
  messagingSenderId: "133971591796",
  appId: "1:133971591796:web:a7c09626a81960c5900721",
  measurementId: "G-PCWC106LY9"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
