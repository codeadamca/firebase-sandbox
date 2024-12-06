import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

signOutButton.style.display = "none";
message.style.display = "none";

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have been signed out!");
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

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

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);