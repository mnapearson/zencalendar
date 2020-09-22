import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfFKYwrFZ32g1MCeMVFivUBEXRKj36TPo",
  authDomain: "zencal-b5217.firebaseapp.com",
  databaseURL: "https://zencal-b5217.firebaseio.com",
  projectId: "zencal-b5217",
  storageBucket: "zencal-b5217.appspot.com",
  messagingSenderId: "705857297700",
  appId: "1:705857297700:web:0dfdca2feb4601ad2b67b1",
  measurementId: "G-XTWYYGM9Z5",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
