import { createContext, useState } from "react";

export const DataContext = createContext();
//junto todos los estados en el contexto para que cuando salga de un componente a otro no se pierdan los datos.
export const DataProvider = ({ children }) => {
  const [rom, setRom] = useState([]);
  const [roms, setRoms] = useState([]);
  const [emuladores, setEmuladores] = useState([]);
  //siempre le pasamos un obj xq es mas facil de trabajar y es practico si se quiere escalar.Manejarlos como objetos podes mandar muchos, como una expresion regular solo uno.
  return (
    <DataContext.Provider
      value={{
        rom,
        roms,
        emuladores,

        setRoms,
        setEmuladores,
        setRom,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
