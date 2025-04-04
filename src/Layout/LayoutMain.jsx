import { BrowserRouter } from "react-router-dom";
import { NavBar, Footer } from "../components";
import { RouterMain } from "../Router";
import "./style.css";

export const LayoutMain = () => {
  //funcion para mover el background en funcion del mouse.
  document.addEventListener('mousemove', function (e) {
    let x = e.clientX / window.innerWidth * 70;
    let y = e.clientY / window.innerHeight * 70;
    document.body.style.backgroundPosition = `${x}% ${y}%`;
  });

  // valores de suavizados
  let lastX = 0;

  //funcion para mover el background en funcion del acelerometro de los smartphone.
  window.addEventListener('devicemotion', function (e) {
    let x = e.accelerationIncludingGravity.x * 1.5;
    
    // Suavizado para evitar el parpadeo
    lastX = lastX * 0.98 + x * 0.03; // Mayor peso al valor previo (evita el parpadeo) y menos al nuevo (ajusta el movimiento)
    
    document.body.style.backgroundPosition = `${lastX}% `;
  });

  return (
    <div className="layout">
      <BrowserRouter>
        <NavBar />
        <main>
          <RouterMain />
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
};
