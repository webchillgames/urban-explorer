// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAVTaN-6WQ0Za6M4rPrkK5ZowBXLxsxVfQ',
  authDomain: 'urban-explorer-5dbde.firebaseapp.com',
  projectId: 'urban-explorer-5dbde',
  storageBucket: 'urban-explorer-5dbde.appspot.com',
  messagingSenderId: '246130238456',
  appId: '1:246130238456:web:af360863247a07021fac0d',
  measurementId: 'G-7XCHXTB65S'
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const database = getDatabase(firebase)
export const gamesRef = ref(database, "games")
export const analytics = getAnalytics(firebase)