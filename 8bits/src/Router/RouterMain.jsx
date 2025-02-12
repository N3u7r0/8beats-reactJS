import { Routes, Route } from "react-router-dom";
import { Home, Emuladores, Roms, RomDetail } from "../pages";


export const RouterMain = () => {

  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/emuladores" element={<Emuladores />} />
      <Route path="/emuladores/:consola" element={<Emuladores />} />
      <Route path="/roms" element={<Roms />} />
      <Route path="/roms/:consola" element={<Roms />} />
      <Route path="/rom/:id" element={<RomDetail />} />
    </Routes>
  );
};