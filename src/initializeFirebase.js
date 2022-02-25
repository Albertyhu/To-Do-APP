import firebase from "firebase/compat/app";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCL_P-cvDN5AMTtGGqjZahbLugs06Kr4L0",

    authDomain: "to-do-list---javascript.firebaseapp.com",

    projectId: "to-do-list---javascript",

    storageBucket: "to-do-list---javascript.appspot.com",

    messagingSenderId: "323621901012",

    appId: "1:323621901012:web:9ea149fbbf3cc8aece6141"

};


// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(); 

export { db }; 

