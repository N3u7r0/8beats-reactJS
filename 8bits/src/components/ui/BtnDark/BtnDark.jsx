import { useEffect, useState } from "react";

export const BtnDark = () => {
  const [botonNeon, setBotonNeon] = useState(true);

  const logicaBtnNeon = () => {
    const root = document.querySelector(":root");
    if (botonNeon) {
      root.style.setProperty("--color-fuente", "rgba(255, 170, 70, 0.8)");
      root.style.setProperty("--color-navbar", "rgba(151, 151, 151, 0.1)");
      root.style.setProperty("--color-footer", "rgb(6,6,6)");
      root.style.setProperty("--color-border", "rgba(151, 151, 151, 0.8)");
      root.style.setProperty("--color-border-tv-parlantes","rgba(255, 190, 0, 0.9)");
      root.style.setProperty("--color-background-section","rgba(0, 0, 0, 0.9)");
      root.style.setProperty("--color-card-gradiante-mid","rgba(211, 211, 211, 0npm.05)");
      root.style.setProperty("--color-card-background", "rgba(0, 0, 0, 0.1)");
      root.style.setProperty("--color-shadow", "rgba(0, 0, 0, 0.6)");
      root.style.setProperty("--color-bar", " rgba(111, 111, 111, 0.9)");
    } else {
      root.style.removeProperty("--color-fuente");
      root.style.removeProperty("--color-navbar");
      root.style.removeProperty("--color-footer");
      root.style.removeProperty("--color-border");
      root.style.removeProperty("--color-border-tv-parlantes");
      root.style.removeProperty("--color-background-section");
      root.style.removeProperty("--color-card-gradiante-mid");
      root.style.removeProperty("--color-card-background");
      root.style.removeProperty("--color-shadow");
      root.style.removeProperty("--color-bar");

    }
    localStorage.setItem("btnDark", JSON.stringify(botonNeon));
    setBotonNeon(!botonNeon);
  };

  let storage = JSON.parse(localStorage.getItem("btnDark"));

  useEffect(() => {
  if(storage){
    logicaBtnNeon();
  }
  }, []);


  return (
    <button onClick={logicaBtnNeon} type="button" className="btn_1up">
      ♥♥♡
    </button>
  );
};
