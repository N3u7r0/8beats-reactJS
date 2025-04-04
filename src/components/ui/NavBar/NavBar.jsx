import { Link } from "react-router-dom";
import { BtnDark } from "../BtnDark";
import "./styles/style.css";

export const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>8-Bits</h1>
      </Link>

      <ul>
        <li>
          <Link to="/">
            <button type="button">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/roms">
            <button type="button">ROMs</button>
          </Link>
        </li>
        <li>
          <Link to="/emuladores">
            <button type="button">Emuladores</button>
          </Link>
        </li>

        {/* este btn va afuera de la ul para que no rompa el diseño de la navbar */}
        <BtnDark />
      </ul>
    </nav>
  );
};
