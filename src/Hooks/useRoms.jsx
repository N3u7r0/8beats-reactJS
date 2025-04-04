import { useEffect, useContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { DataContext } from "../components/context/DataContext";

// Comentamos con camelcase porque es un custom hook.
export const useRoms = () => {
  const { roms, setRoms } = useContext(DataContext);

  useEffect(() => {
    // Comprueno si los datos existen en DataContext.
    if (roms.length > 0) {
      // Si los datos existen en DataContext, no hago la llamada a Firebase.
      const localRoms = roms;
      setRoms(localRoms);
      console.log("No hay llamada!!! Datos cargados desde el contexto.");
    } else {
      // aca le digo a Firebase que me traiga la colección de roms.
      const romsCollection = collection(db, "roms");
      getDocs(romsCollection)
        .then((snapshot) => {
          const newRomsFirebase = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Actualizo el estado de roms.
          setRoms(newRomsFirebase);
          console.log(
            "Llamada a Firebase realizada y datos actualizados en context."
          );
        })
        .catch((err) => console.log(err));
    }
  }, [setRoms]);

  return { roms };
};
