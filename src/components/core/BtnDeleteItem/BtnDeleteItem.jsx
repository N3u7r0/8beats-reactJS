import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./style/style.css";

export const BtnDeleteItem = ({ idItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
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
        //si el idItem es igual al id de la ruta, entonces se elimina el documento de la colección roms
        if (romRef.id === id) {
          await deleteDoc(romRef);
          Swal.fire({
            title: "Listo!",
            text: "ROM eliminado con éxito",
            icon: "success",
            position: "bottom-end",
            timer: 1000,
            timerProgressBar: true,
            toast: true,
            showConfirmButton: false,
            iconColor: "rgba(200, 0, 250, 0.4)",
            color: "rgba(236, 171, 20, 0.9)",
            background: "rgba(0, 0, 0, 0.80)",
          });
          setTimeout(() => {
            navigate("/roms");
          }, 1);
         
          //si no elimina el documento de la colección emuladores
        } else if (emuladorRef) {
          await deleteDoc(emuladorRef);
          Swal.fire({
            title: "Listo!",
            text: "Emulador eliminado con éxito",
            icon: "success",
            position: "bottom-end",
            timer: 1000,
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
          timer: 1000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
        });
      } finally {
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      }
    } else {
      console.info(
        "No se eliminó el documento xq no se confirmo la eliminación"
      );
    }
  };

  return (
    <button className="btnDeleteItem" onClick={handleDeleteClick}>
      Eliminar
      <br />
      archivo
    </button>
  );
};
