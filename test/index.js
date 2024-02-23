// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZTWQrUqW20PQB9OXj--Zb9nYJWchC6Es",
  authDomain: "testfirebase-3f596.firebaseapp.com",
  projectId: "testfirebase-3f596",
  storageBucket: "testfirebase-3f596.appspot.com",
  messagingSenderId: "518985791267",
  appId: "1:518985791267:web:8751e77d6177cbcb347e96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "/messages");

onValue(
  messages,
  (snapshot) => {
    console.log(snapshot);
  },
  {
    onlyOnce: false,
  }
);
