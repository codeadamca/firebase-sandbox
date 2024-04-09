// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4cRs_wUDWohD7VxBmM--iZG7_cEt7NO8",
  authDomain: "testfirebase-f94e9.firebaseapp.com",
  databaseURL: "https://testfirebase-f94e9-default-rtdb.firebaseio.com",
  projectId: "testfirebase-f94e9",
  storageBucket: "testfirebase-f94e9.appspot.com",
  messagingSenderId: "739286521141",
  appId: "1:739286521141:web:d146ab390e36e1349a287c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "/messages");

onValue(
  messages,
  (snapshot) => {
    console.log(snapshot);

    const ul = document.getElementById("messages");
    ul.replaceChildren();

    snapshot.forEach((childSnapshot) => {
      console.log(childSnapshot.key);
      console.log(childSnapshot.val());

      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      const text = document.createTextNode(childData.message);
      const li = document.createElement("li");

      li.appendChild(text);
      ul.appendChild(li);
    });
  },
  {
    onlyOnce: false,
  }
);
