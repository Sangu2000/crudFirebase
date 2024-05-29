import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyA6tqXco3XE_g7N81VLKsK5dN0vbA8Xj3w",
    authDomain: "fire-1eeb4.firebaseapp.com",
    projectId: "fire-1eeb4",
    storageBucket: "fire-1eeb4.appspot.com",
    messagingSenderId: "485918545597",
    appId: "1:485918545597:web:300bf5706aaee4f1f489d4"
}

const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()