import { useParams } from "react-router-dom";
import { ItemDetailContainer } from "../components";
import { useRomsById } from "../Hooks";

export const RomDetail = () => {
  const { id } = useParams();
  const { rom } = useRomsById(id);

  return (
    <>
    <h2 className="tituloPrincipal">8-bits</h2>
      <section className="div-flex">
        <ItemDetailContainer rom={rom} />
      </section>
    </>
  );
};
