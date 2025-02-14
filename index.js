// Documentation
// https://firebase.google.com/docs/database/web/read-and-write

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase();

// Fetch messages
const messages = ref(database, "/messages");

// On data event
onValue(
  messages,
  (snapshot) => {
    // Create a reference to the ul element
    const ul = document.getElementById("messages");

    // Empty the ul emelemt
    ul.replaceChildren();

    // Loop through messages
    snapshot.forEach((childSnapshot) => {
      // Get key and children
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      console.log(childKey);
      console.log(childData);

      // Add message to list
      const text = document.createTextNode(
        childData.message + " ~ " + childData.name
      );
      const li = document.createElement("li");
      li.appendChild(text);
      ul.appendChild(li);
    });
  },
  {
    onlyOnce: false,
  }
);

let add = document.getElementById("add");

add.addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const message = document.getElementById("message");

  const newMessageRef = push(messages);

  set(newMessageRef, {
    name: name.value,
    message: message.value,
    createdAt: serverTimestamp(),
  });

  e.preventDefault();
});
