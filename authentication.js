// Documentation
// https://firebase.google.com/docs/database/web/read-and-write

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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

// Initialize Authentication and get a reference to the service
const auth = getAuth();

// Setup the Google Auth Provider
const provider = new GoogleAuthProvider();

// Create references to each HTML element
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

// Hide sign out and message until logged in
signOutButton.style.display = "none";
message.style.display = "none";

// When sign in button is clicked
const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// When sign out button is clicked
const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have signed out successfully!");
    })
    .catch((error) => {});
};

// When auth state chages
// This is executed when the login popup is completed
// Or the page loads and a user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    signOutButton.style.display = "block";
    message.style.display = "block";
    userName.innerHTML = user.displayName;
    userEmail.innerHTML = user.email;
  } else {
    signOutButton.style.display = "none";
    message.style.display = "none";
  }
});

// Add event listeners
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
