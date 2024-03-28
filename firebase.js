  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"
  import { } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
  import { } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-functions.js";  
  import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCAF5-rKXavofX4M7nMB7m1l6c1VEZGvcE",
    authDomain: "tercero-8ee51.firebaseapp.com",
    projectId: "tercero-8ee51",
    storageBucket: "tercero-8ee51.appspot.com",
    messagingSenderId: "902200318862",
    appId: "1:902200318862:web:5069024b7baf932d4aa2df"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const saveRegistro = async (name, surname, email, password, password2) => {
    const regRef = collection(db,"registros");
    await addDoc(regRef, {name, surname, email, password, password2});
};

export const getUsuarios = () => getDocs(collection(db, "registros"));

export const onGetUsuarios = () => onSnapshot(collection(db, "registros"), callback);

export const deleteUsuarios = async (id) => {
    const regRef = doc (db, "registros", id);
    await deleteDoc(regRef);
};

export const getUsuariosById = (id) => getDoc(doc(db, "registros", id));

export const updateUsuarios = async (id, newFields) => {
    const regRef = doc(db, "registros", id );
    await updateDoc(regRef, newFields);
};

export {auth};