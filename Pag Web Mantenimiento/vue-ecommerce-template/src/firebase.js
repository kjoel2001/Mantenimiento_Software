import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Agrega tus credenciales de Firebase aquí
  apiKey: "AIzaSyDYuHGVrYbS37RkiynuHee3SwsMJyNy5m4",
  authDomain: "dustgaming-bf602.firebaseapp.com",
  projectId: "dustgaming-bf602",
  storageBucket: "dustgaming-bf602.appspot.com",
  messagingSenderId: "537275923237",
  appId: "1:537275923237:web:c8bad50d47fdf9bf8ff8cc",
  measurementId: "G-JLP1LTWPM8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export default firebase
