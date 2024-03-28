import { } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";
import { } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-functions.js";  
import { getAuth, getFirestore } from "../lib/fabrica.js";
import { muestraError } from "../lib/util.js";

const firestore = getFirestore();
const daoUsuario = firestore.collection("Usuario");

export async function iniciaSesión() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await getAuth().signInWithRedirect(provider);
  } catch (error) {
    muestraError(error);
  }
}

export async function tieneRol(usuario, roles) {
  try {
    if (usuario && usuario.email) {
      const rolIds = await cargaRoles(usuario.email);

      // Verifica si el conjunto de roles incluye "admin" o "usuario"
      if (roles.some(rol => rolIds.has(rol))) {
        // Redirige al usuario según su rol
        if (rolIds.has("admin")) {
          window.location.href = "crud.html";
        } else {
          window.location.href = "usuario.html";
        }
        return true;
      } else {
        alert("No autorizado.");
        window.location.href = "usuario.html";
        return false;
      }
    } else {
      // Si no hay usuario o correo, inicia sesión
      await iniciaSesión();
      return false;
    }
  } catch (error) {
    muestraError(error);
    return false;
  }
}

export async function terminaSesión() {
  try {
    await getAuth().signOut();
  } catch (error) {
    muestraError(error);
  }
}

export async function cargaRoles(email) {
  try {
    const doc = await daoUsuario.doc(email).get();
    if (doc.exists) {
      const data = doc.data();
      return new Set(data.rolIds || []);
    } else {
      return new Set();
    }
  } catch (error) {
    muestraError(error);
    return new Set();
  }
}
