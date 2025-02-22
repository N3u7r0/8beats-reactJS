import { ItemListContainer } from "../components";
import { FormEmuladores } from "../components";
import { FormRoms } from "../components";
import { useRomsLast } from "../Hooks";
import "./styles/style.css";

export const Home = () => {
  const { ultimosRoms } = useRomsLast();
  console.log(ultimosRoms);

  return (
    <>
      <h2 className="tituloPrincipal">Home</h2>


      <header className="banner-home">
        <div className="banner"></div>
      </header>

      <section className="div-flex-home">
        <h3>ultimos roms</h3>
        <section className="div-ultimoRoms">
        <ItemListContainer ultimosRoms={ultimosRoms} />
        </section>
          <h3>subi tu rom/emulador</h3>
        <section className="forms-home">
          <FormRoms />
          <FormEmuladores />
        </section>

      </section>
    </>
  );
};
