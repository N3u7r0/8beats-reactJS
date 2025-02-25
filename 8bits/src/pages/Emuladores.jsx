import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { EmulatorListContainer } from "../components";
import { useEmulators } from "../Hooks";
import "./styles/style.css";

export const Emuladores = () => {
  const { emuladores } = useEmulators();
  const [emuladoresFiltrados, setEmuladoresFiltrados] = useState([]);
  const { consola } = useParams("");

  useEffect(() => {
    let filteredEmulators = emuladores;
    switch (consola) {
      case "nes":
        filteredEmulators = emuladores.filter(
          (emulador) => emulador.consola === "nes"
        );
        setEmuladoresFiltrados(filteredEmulators);
        break;
      case "sega":
        filteredEmulators = emuladores.filter(
          (emulador) => emulador.consola === "sega"
        );
        setEmuladoresFiltrados(filteredEmulators);
        break;
      case "neogeo":
        filteredEmulators = emuladores.filter(
          (emulador) => emulador.consola === "neogeo"
        );
        setEmuladoresFiltrados(filteredEmulators);
        break;
      case "psx":
        filteredEmulators = emuladores.filter(
          (emulador) => emulador.consola === "psx"
        );
        setEmuladoresFiltrados(filteredEmulators);
        break;
      default:
        filteredEmulators = emuladores;
        break;
    }
    setEmuladoresFiltrados(filteredEmulators);
  }, [emuladores, consola]);

  return (
    <>
      <h2 className="tituloPrincipal">Emuladores</h2>
      <div className="div-nav_container-cards">
        <nav className="nav-itemListContainer">
          <ul>
            <li>
              <p>Emuladores:</p>
            </li>
            <li>
              <Link to="/emuladores">
                <button type="reset">Todos</button>
              </Link>
            </li>
            <li>
              <Link to="/emuladores/sega">
                <button type="button">Sega</button>
              </Link>
            </li>
            <li>
              <Link to="/emuladores/nes">
                <button type="button">Nes</button>
              </Link>
            </li>
            <li>
              <Link to="/emuladores/neogeo">
                <button type="button">Neo-Geo</button>
              </Link>
            </li>
            <li>
              <Link to="/emuladores/psx">
                <button type="button">Psx</button>
              </Link>
            </li>
          </ul>
        </nav>

        <section className="container-cards">
          <EmulatorListContainer emuladoresFiltrados={emuladoresFiltrados} />
        </section>
      </div>
    </>
  );
};
