import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Importar la configuración de Firestore
import Swal from "sweetalert2";
import "./style/style.css";

export function FormEmuladores() {
  //guardo los datos del formulario en un estado
  const [inputsEmuladores, setInputsEmuladores] = useState({
    titulo: "",
    consola: "",
    descripcion: "",
    plataforma: "",
    link: "",
    foto: null,
  });

  // Agregar estado para deshabilitar el botón
  const [isSubmitting, setIsSubmitting] = useState(false);

  //desestructuro el nombre y valor del input.
  const handleChange = (input) => {
    const { name, value } = input.target;
    setInputsEmuladores((inputsRom) => ({
      ...inputsRom,
      [name]: value || "",
    }));
  };

  //desestructuro el nombre y valor del input de las fotos.
  const handleFileChange = (inputFoto) => {
    const { name, files } = inputFoto.target;
    setInputsEmuladores((inputsRom) => ({
      ...inputsRom,
      [name]: files[0] || null,
    }));
  };

  //subo la foto a firebase
  const uploadFile = async (foto, nombreDeLaFotoENFiresbase) => {
    //instacia de guardado
    const storage = getStorage();
    //refencia a la ubicacion de la foto en firebase
    const storageRef = ref(storage, `roms/${nombreDeLaFotoENFiresbase}`);
    //subo la foto
    await uploadBytes(storageRef, foto);
    //obtengo la url de la foto
    const downloadURL = await getDownloadURL(storageRef);
    //retorno la url para usarlo en el handleSubmit.
    return downloadURL;
  };

  //funcion para subir el formulario a firebase.
  const handleSubmit = async (formulario) => {
    //evito que se recargue la pagina para que le de tiempo a subir el dato.
    formulario.preventDefault();
    // Deshabilito el botón de submit
    setIsSubmitting(true);

    //array con los campos de texto que no pueden estar vacios.
    const camposTextoExclutentes = ["titulo", "consola", "descripcion", "link"];
    const camposLlenos = camposTextoExclutentes.every(
      (campo) => inputsEmuladores[campo] !== ""
    );

    if (!camposLlenos) {
      //si hay campos vacios muestro un error en la consola.
      console.error("Hay campos de texto vacíos en el formulario.");
      //alert!!!!!
      Swal.fire({
        title: "Error!",
        text: "Hay campos de texto vacíos!",
        icon: "error",
        position: "bottom-end",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        showConfirmButton: false,
        popup: "custom-toast", // declaro la clsssname de la alerta y la uso en el css que esta en el src.
      });
      // Habilito el botón de submit si hay error
      setIsSubmitting(false);
    } else {
      //si no hay campos vacios subo el formulario a firebase.
      try {
        //referencia a los campos de las fotos.
        const camposFotos = ["foto"];
        //promesas de subida de las fotos.
        const uploadPromesas = camposFotos.map(async (foto) => {
          if (inputsEmuladores[foto]) {
            const fileName = `${inputsEmuladores.titulo}_${foto}`;
            const downloadURL = await uploadFile(
              inputsEmuladores[foto],
              fileName
            );
            //retorno un objeto con el nombre de la foto y la url de la foto.
            return { [foto]: downloadURL };
          }
          //si no subio la foto retorno un null para controlar el error
          return { [foto]: null };
        });
        //guardo las url de las fotos en un objeto.
        const fotoURLs = await Promise.all(uploadPromesas);
        //actualizo el estado de las fotos con las url de las fotos. (... para desestructurar el objeto (todos los inputsRom y todas las fotos))
        const updatedInputsRom = {
          ...inputsEmuladores,
          ...Object.assign({}, ...fotoURLs),
          createdAt: new Date(),
        };
        //subo el formulario a firebase.
        const docRef = await addDoc(
          collection(db, "emuladores"),
          updatedInputsRom
        );
        console.info("Documento añadido con ID: ", docRef.id);
        //alert!!!!!
        Swal.fire({
          title: "Listo!",
          text: "Emulador agregado con éxito",
          icon: "success",
          position: "bottom-end",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
          popup: "custom-toast", // declaro la clsssname de la alerta y la uso en el css que esta en el src.
        });
      } catch (err) {
        console.error("Error al añadir el documento: ", err);
        //alert!!!!!
        Swal.fire({
          title: "Error!",
          text: "Error al añadir el emulador",
          icon: "error",
          position: "bottom-end",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
          popup: "custom-toast", // declaro la clsssname de la alerta y la uso en el css que esta en el src.
        });
      } finally {
        //refresh de la pagina para q tome el cambio despues de subir el formulario.
        window.location.reload();
      }
    }
  };

  return (
    <article className="contenedor_Forms">
      <h5>Nuevo Emulador</h5>

      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <p>Nombre</p>
            <input
              name="titulo"
              type="text"
              placeholder="Nombre del juego."
              value={inputsEmuladores.titulo}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Consola</p>
            <input
              name="consola"
              type="text"
              placeholder="consola."
              value={inputsEmuladores.consola}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Descripcion</p>
            <input
              name="descripcion"
              type="text"
              placeholder="Descripcion de la card del juego."
              value={inputsEmuladores.descripcion}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Plataforma</p>
            <input
              name="plataforma"
              type="text"
              placeholder="Tipo de plataforma."
              value={inputsEmuladores.plataforma}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Link</p>
            <input
              name="link"
              type="text"
              placeholder="Link de descarga."
              value={inputsEmuladores.link}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Foto portada</p>
            <div className="contenedorFotosForms">
              <input name="foto" type="file" onChange={handleFileChange} />
            </div>
          </li>
        </ul>
        <button type="submit" disabled={isSubmitting}>
          Subir
        </button>
      </form>
    </article>
  );
}
