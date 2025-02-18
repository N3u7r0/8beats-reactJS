import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./style/style.css";

export const BtnDeleteItem = ({ idItem }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Obtener el objeto navigate

  // Función para eliminar un documento en Firestore
  const handleDeleteClick = async () => {
    // Pregunta de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      icon: "question",
      iconColor: "rgba(200, 0, 250, 0.4)",
      showCancelButton: true,
      confirmButtonColor: "rgba(200, 0, 250, 0.9) ",
      cancelButtonColor: "rgba(0, 0, 0, 0.9)",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
      color: " rgba(236, 171, 20, 0.9)",
      
      background: "rgba(0, 0, 0, 0.80)",
    });

    if (result.isConfirmed) {
      // Obtiene las referencias de los documentos de la colección.
      const romRef = doc(db, "roms", idItem || id);
      const emuladorRef = doc(db, "emuladores", idItem);
      try {
        if (romRef) {
          // Elimina el rom
          await deleteDoc(romRef);
          console.info("Documento eliminado con éxito:", idItem);
          //alerta!!!!
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
            showCancelButton: true,
            color: " rgba(236, 171, 20, 0.9)",
            background: "rgba(0, 0, 0, 0.80)",
          });
        }

        if (emuladorRef) {
          // Elimina el emulador
          await deleteDoc(emuladorRef);
          console.log("Documento eliminado con éxito:", idItem);
          //alerta!!!!
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
            color: " rgba(236, 171, 20, 0.9)",
            background: "rgba(0, 0, 0, 0.80)",
          });
        }
      } catch (err) {
        console.error("Error al eliminar el documento: ", err);
        //alerta!!!!
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
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2300);
      }
    }
  };

  return (
    <button className="btnDeleteItem" onClick={() => handleDeleteClick(idItem)}>
      Eliminar
      <br />
      archivo
    </button>
  );
};
