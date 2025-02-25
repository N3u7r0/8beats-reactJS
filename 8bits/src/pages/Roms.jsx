import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ItemListContainer } from "../components";
import { useRoms } from "../Hooks";
import "./styles/style.css";

export const Roms = () => {
  const { roms } = useRoms();
  const [romsFiltrados, setRomsFiltrados] = useState([]);
  const { consola } = useParams("");

  useEffect(() => {
    let filteredRoms = roms;

    switch (consola) {
      case "nes":
        filteredRoms = roms.filter((rom) => rom.consola === "nes");
        setRomsFiltrados(filteredRoms);
        break;
      case "sega":
        filteredRoms = roms.filter((rom) => rom.consola === "sega");
        setRomsFiltrados(filteredRoms);
        break;
      case "neogeo":
        filteredRoms = roms.filter((rom) => rom.consola === "neogeo");
        setRomsFiltrados(filteredRoms);
        break;
      case "psx":
        filteredRoms = roms.filter((rom) => rom.consola === "psx");
        setRomsFiltrados(filteredRoms);
        break;
      default:
        filteredRoms = roms;
        break;
    }
    setRomsFiltrados(filteredRoms);
  }, [roms, consola]);

  return (
    <>
      <h2 className="tituloPrincipal">ROMs</h2>
      <div className="div-nav_container-cards">
        <nav className="nav-itemListContainer">
          <ul>
            <li>
              {" "}
              <p>ROMs:</p>
            </li>
            <li>
              <Link to="/roms">
                <button type="reset">Todos</button>
              </Link>
            </li>
            <li>
              <Link to="/roms/sega">
                <button type="button">Sega</button>
              </Link>
            </li>
            <li>
              <Link to="/roms/nes">
                <button type="button">Nes</button>
              </Link>
            </li>
            <li>
              <Link to="/roms/neogeo">
                <button type="button">Neo-Geo</button>
              </Link>
            </li>
            <li>
              <Link to="/roms/psx">
                <button type="button">Psx</button>
              </Link>
            </li>
          </ul>
        </nav>
        <section className="container-cards">
          <ItemListContainer romsFiltrados={romsFiltrados} />
        </section>
      </div>
    </>
  );
};
