// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdgMp2_5yqXtPaZNKHdf73iLeAz3yNdRg",
  authDomain: "e-shop-vid-bbce8.firebaseapp.com",
  projectId: "e-shop-vid-bbce8",
  storageBucket: "e-shop-vid-bbce8.appspot.com",
  messagingSenderId: "400513118348",
  appId: "1:400513118348:web:8ecfff5a8dc34ccc8ecba9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;