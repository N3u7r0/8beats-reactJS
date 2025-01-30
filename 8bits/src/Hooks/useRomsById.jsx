import { useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { DataContext } from "../components/context/DataContext";
export const useRomsById = () => {
  const { rom, setRom } = useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    // aca es donde se hace la llamada y le digo q de mi base de datos de firebase me traiga una coleccion de roms.
    const romsCollection = doc(db, "roms", id);
    //esto es una promesa como axios o fech. le pasamos la coleccion de roms que guardamos en romsCollection.
    getDoc(romsCollection)
      .then((snapshot) => {
        setRom({ id: snapshot.id, ...snapshot.data() });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return { rom };
};
