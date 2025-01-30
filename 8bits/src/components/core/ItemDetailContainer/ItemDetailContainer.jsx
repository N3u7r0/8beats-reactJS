import { Spin } from "../../ui";
import { BtnDeleteItem } from "../BtnDeleteItem";
import "./style/index.css";
import fotoNoDisponible from "../../../assets/img_noDisponible/noDisponible.jpg"
export const ItemDetailContainer = ({ rom }) => {
  return rom?.length === 0 ? (
    <Spin />
  ) : (
    <>
      <div className="cardtv_cardIformeDetail">

        <article key={rom.id} className="cardTv">
          <h3>{rom.titulo}</h3>

          <div className="tv-flex">
            <div className="tv">
              <div className="tv-parlante-a"></div>
              <img
                className="img-card"
                src={rom.fotoPortada||fotoNoDisponible}
                alt={rom.fotoAlt}
              />
              <div className="tv-parlante-b"></div>
            </div>

            <div className="contenedor-botonera-logo">
              <h6 className="tv-logo">8-bits</h6>
              <p className="botonera">Ooooo</p>
            </div>
          </div>
          <p>↓</p>
          <a type="button" className="btn" href={rom.link}>
            {" "}
            → {rom.titulo} ←
          </a>
        </article>

        <aside className="cardInfoDetail">
          <h5>Reseña:</h5>
          <p>{rom.descripcion_detail}</p>
          <h5>Año de lanzamiento:</h5>
          <p>{rom.lanzamiento}</p>
          <h5>Empresa:</h5>
          <p>{rom.empresa}</p>
        </aside>

        <aside className="fotos-contenedor">
          <Spin src={rom.foto_1||fotoNoDisponible} alt={"foto emulador 1"} />
          <Spin src={rom.foto_2||fotoNoDisponible} alt={"foto emulador 2"} />
          <Spin src={rom.foto_3||fotoNoDisponible} alt={"foto emulador 3"} />
        </aside>
      </div>
      <span className="btnDelete"> <BtnDeleteItem idItem={rom.id} /></span>
    </>
  );
};
