import { FormEmuladores } from "../components/core/forms";
import { FormRoms } from "../components/core/forms";
import "./styles/style.css";

export const Home = () => {
  return (
    <>
      <h2 className="tituloPrincipal">Home</h2>

      <section className="div-flex">
        <div className="banner-home" >
          <div className="banner"></div>
        </div>
        <FormRoms />
        <FormEmuladores />
      </section>
    </>
  );
};
