
// Documentation
// https://firebase.google.com/docs/database/web/start

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    push, 
    set,
    onValue,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOp_5lPbbZTk7qlqUjqJyCxncq7eA2SmA",
    authDomain: "humber-new-project.firebaseapp.com",
    projectId: "humber-new-project",
    storageBucket: "humber-new-project.firebasestorage.app",
    messagingSenderId: "873760620842",
    appId: "1:873760620842:web:29c7ab2aa995647da8de53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize a database connection
const database = getDatabase();

// Fetch messages
const messages = ref(database, "/messages");

onValue(
    messages,
    (snapshot) => {
        
        // Create a reference to the messages ul
        let ul = document.getElementById("messages");

        ul.replaceChildren();

        // Loop through the messaegs children
        snapshot.forEach((childSnapshot) => {

            // Fetch the child id and data
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childKey);
            console.log(childData);

            // Add message data to ul
            const text = document.createTextNode(
                childData.message + " ~ " + childData.name
            );

            const li = document.createElement("li");

            li.appendChild(text);
            ul.appendChild(li);

            // Append using innerHtml
            // const nextMessage = "<li>" + childData.message + " ~ " + childData.name + "</li>";

        });

    },{
        onlyOnce: false
    }
);

const add = document.getElementById("add");

add.addEventListener("click", function(e){

    const name = document.getElementById("name");
    const message = document.getElementById("message");

    const newMessage = push(messages);

    set(newMessage, {
        name: name.value,
        message: message.value,
        createdAt: serverTimestamp(),
    });

});