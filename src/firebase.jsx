import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZQAvmisI8lEF9cfKgvR2iSUdw-5YUWzA",
  authDomain: "newsapp-d213d.firebaseapp.com",
  projectId: "newsapp-d213d",
  storageBucket: "newsapp-d213d.appspot.com",
  messagingSenderId: "786530978031",
  appId: "1:786530978031:web:6172e4eb409ca598e4f31a",
  measurementId: "G-R459QHW62Y",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// export const app;
const db = app.firestore();
const auth = firebase.auth();

export { auth };
export default db;
export const firestore = getFirestore(app);
