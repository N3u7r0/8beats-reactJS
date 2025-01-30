import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // la variable de entorno estan en el archivo .env (en vite se se accede con import.meta.env, no con prosees.env)
  apiKey: "AIzaSyCqMFNLpAYblcGrYISoIEW3sJl8Ndg-OCA",
  authDomain: "bits-6ecf6.firebaseapp.com",
  projectId: "bits-6ecf6",
  storageBucket: "bits-6ecf6.appspot.com",
  messagingSenderId: "606871182087",
  appId: import.meta.env.VITE_APP_ID, //var de entorno.
};

// Inicializamos el servicio de Firebase
const app = initializeApp(firebaseConfig);

//Inicializamos la base de datos (db es database)
export const db = getFirestore(app);
