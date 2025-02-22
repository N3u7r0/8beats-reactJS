import { Spin } from "../../ui";
import "./style/style.css";
import { Link } from "react-router-dom";
import fotoNoDisponible from "../../../assets/img_noDisponible/noDisponible.jpg";

export const ItemListContainer = ({ romsFiltrados, emuladoresFiltrados, ultimosRoms }) => {

  if (romsFiltrados) {
    return romsFiltrados?.length === 0 ? (
      <Spin />
    ) : (
      <>
        <section className="contenedor-cards">
          {romsFiltrados.map((rom) => (
            <article key={rom.id} className="card">
              <ul>
                <li>
                  <h3>{rom.titulo}</h3>
                </li>
                <li>
                  {/* adentro del espin toma la url de la imagen y el alt  q paso como prop, para que no se rompa si no hay imagen */}
                  <Spin
                    src={rom.fotoPortada || fotoNoDisponible}
                    alt={rom.fotoAlt}
                  />
                </li>
                <li>
                  <p>{rom.descripcion}</p>
                </li>
                <li>
                  <Link to={`/rom/${rom.id}`}>
                    <button type="button" className="btn">
                      ver más
                    </button>
                  </Link>
                </li>
              </ul>
            </article>
          ))}
        </section>
      </>
    );
  }

  if (emuladoresFiltrados) {
    return emuladoresFiltrados?.length === 0 ? (
      <Spin />
    ) : (
      <>
        <section className="contenedor-cards">
          {emuladoresFiltrados.map((emulador) => (
            <article key={emulador.id} className="card card-emuladores">
              <ul>
                <li>
                  <h3>{emulador.titulo}</h3>
                </li>
                <li>
                  {/* adentro del espin toma la url de la imagen y el alt  q paso como prop, para que no se rompa si no hay imagen */}
                  <Spin src={emulador.foto} alt={emulador.titulo} />
                </li>
                <li className="contenedor-texto-emuladores">
                  <p>{emulador.descripcion}</p>

                  <p> consola: {emulador.consola}</p>

                  <p>plataforma: {emulador.platafoma}</p>
                </li>

                <li>
                  <a type="button" className="btn" href={emulador.link}>
                    link
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </section>
      </>
    );
  }

  if (ultimosRoms) {
    return ultimosRoms?.length === 0 ? (
      <Spin />
    ) : (
      <>
        <section className="contenedor-cards">
          {ultimosRoms.map((rom) => (
            <article key={rom.id} className="card">
              <ul>
                <li>
                  <h3>{rom.titulo}</h3>
                </li>
                <li>
                  {/* adentro del espin toma la url de la imagen y el alt  q paso como prop, para que no se rompa si no hay imagen */}
                  <Spin
                    src={rom.fotoPortada || fotoNoDisponible}
                    alt={rom.fotoAlt}
                  />
                </li>
                <li>
                  <p>{rom.descripcion}</p>
                </li>
                <li>
                  <Link to={`/rom/${rom.id}`}>
                    <button type="button" className="btn">
                      ver más
                    </button>
                  </Link>
                </li>
              </ul>
            </article>
          ))}
        </section>
      </>
    );
  }
};
