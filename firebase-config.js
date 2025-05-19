// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf2iRxuptFU_7amkqXfQikHuy2xY984JM",
  authDomain: "to-do-list-e19cc.firebaseapp.com",
  projectId: "to-do-list-e19cc",
  storageBucket: "to-do-list-e19cc.firebasestorage.app",
  messagingSenderId: "974846325265",
  appId: "1:974846325265:web:8134f5a0becfb5301e77b0",
  measurementId: "G-CZBBW3YER4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
