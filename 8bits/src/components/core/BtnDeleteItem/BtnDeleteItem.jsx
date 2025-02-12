import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

export const BtnDeleteItem = ({ idItem }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Obtener el objeto navigate

  // Función para eliminar un documento en Firestore
  const handleDeleteClick = async () => {
    // Obtiene las referencias de los documentos de la coleccion.
    const romRef = doc(db, "roms", idItem || id);
    const emuladorRef = doc(db, "emuladores", idItem);
    try {
      if (romRef) {
        // Elimina el rom
        await deleteDoc(romRef);
        console.info("Documento eliminado con éxito:", idItem);
        //alert!!!!!
        Swal.fire({
          title: "Listo!",
          text: "ROM eliminado con éxito",
          icon: "success",
          position: "bottom-end",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
        });
      }

      if (emuladorRef) {
        // Elimina el emulador
        await deleteDoc(emuladorRef);
        console.log("Documento eliminado con éxito:", idItem);
        //alert!!!!!
        Swal.fire({
          title: "Listo!",
          text: "Emulador eliminado con éxito",
          icon: "success",
          position: "bottom-end",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Error al eliminar el documento: ", err);
      //alert!!!!!
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
      // Redirige a la página de inicio si encuentra el id del la prop es igual a la id del parametro de url, para que regrese atras y no quede en la pg de detail en el ItemDetail
      if (idItem === id) {
        setTimeout(() => {
          navigate("/roms");
          window.location.reload();
        }, 2400);
      } else {
        setTimeout(() => {
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
