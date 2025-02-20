import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./style/style.css";
import { useState } from "react";

export const BtnDeleteItem = ({ idItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    setIsDeleting(true);

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      icon: "question",
      iconColor: "rgba(200, 0, 250, 0.4)",
      showCancelButton: true,
      confirmButtonColor: "rgba(200, 0, 250, 0.9)",
      cancelButtonColor: "rgba(0, 0, 0, 0.9)",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
      color: "rgba(236, 171, 20, 0.9)",
      background: "rgba(0, 0, 0, 0.80)",
    });

    if (result.isConfirmed) {
      const romRef = doc(db, "roms", idItem || id);
      const emuladorRef = doc(db, "emuladores", idItem);
      try {
        if (romRef) {
          await deleteDoc(romRef);
          Swal.fire({
            title: "Listo!",
            text: "ROM eliminado con éxito",
            icon: "success",
            position: "bottom-end",
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            showConfirmButton: false,
            iconColor: "rgba(200, 0, 250, 0.4)",
            color: "rgba(236, 171, 20, 0.9)",
            background: "rgba(0, 0, 0, 0.80)",
          });
        }

        if (emuladorRef) {
          await deleteDoc(emuladorRef);
          Swal.fire({
            title: "Listo!",
            text: "Emulador eliminado con éxito",
            icon: "success",
            position: "bottom-end",
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            showConfirmButton: false,
            iconColor: "rgba(200, 0, 250, 0.4)",
            color: "rgba(236, 171, 20, 0.9)",
            background: "rgba(0, 0, 0, 0.80)",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Error al eliminar el documento",
          icon: "error",
          position: "bottom-end",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
        });
      } finally {
        if (romRef !== null || undefined) {
          setTimeout(() => {
            navigate("/roms");
            window.location.reload();
          }, 2000);
        }
        if (emuladorRef !== null || undefined) {
          setTimeout(() => {
            navigate("/emuladores");
            window.location.reload();
          }, 2000);
        } 
  
      }
    }

    setIsDeleting(false);
  };

  return (
    <button className="btnDeleteItem" onClick={() => handleDeleteClick(idItem)} disabled={isDeleting}>
      Eliminar
      <br />
      archivo
    </button>
  );
};

