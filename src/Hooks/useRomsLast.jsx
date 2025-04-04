import { useEffect, useContext } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { DataContext } from "../components/context/DataContext";

// Comentamos con camelcase porque es un custom hook.
export const useRomsLast = () => {
  const { ultimosRoms, setUltimosRoms } = useContext(DataContext);

  useEffect(() => {
    // Compruebo si los datos existen en DataContext.
    if (ultimosRoms.length > 0) {
      // Si los datos existen en DataContext, no hago la llamada a Firebase.
      const localRoms = ultimosRoms;
      setUltimosRoms(localRoms);
      console.log("No hay llamada!!! Datos cargados desde el contexto.");
    } else {
      // Aca le digo a Firebase que me traiga los 3 últimos documentos de la colección de roms.
      const romsCollection = collection(db, "roms");
      const romsQuery = query(
        romsCollection,
        orderBy("createdAt", "desc"),
        limit(3)
      ); // Ordenar por fecha en orden descendente y limitar a 3

      getDocs(romsQuery)
        .then((snapshot) => {
          const newRomsFirebase = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Actualizo el estado de roms.
          setUltimosRoms(newRomsFirebase);
          console.log(
            "Llamada a Firebase realizada y datos actualizados en context."
          );
        })
        .catch((err) => console.log(err));
    }
  }, [setUltimosRoms]);

  return { ultimosRoms };
};
