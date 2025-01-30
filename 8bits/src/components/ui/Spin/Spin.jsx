import { useState } from "react";
import "./style/style.css";

export const Spin = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <h3 className="spin">loading...</h3>}
      <img
        className=" img-card-emuladores img-card fotosGameplay"
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={
          //se que los stylos no tienen que estar aca, pero no me funciono de otra manera.
          { display: loading ? "none" : "block" }
        }
      />
    </>
  );
};
