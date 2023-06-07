// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHsEadOWJItN0pKxArV7YHX3Wios8muEU",
  authDomain: "e-home-dev.firebaseapp.com",
  projectId: "e-home-dev",
  storageBucket: "e-home-dev.appspot.com",
  messagingSenderId: "498959222941",
  appId: "1:498959222941:web:fef788b6036ec977ef2c74"
};

// Initialize Firebase
const f = firebase.initializeApp(firebaseConfig);

export {f};