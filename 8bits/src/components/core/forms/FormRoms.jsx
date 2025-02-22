import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Importar la configuración de Firestore
import "./style/style.css";
import Swal from "sweetalert2";

export function FormRoms() {
  //guardo los datos del formulario en un estado
  const [inputsRom, setInputsRom] = useState({
    titulo: "",
    descripcion: "",
    descripcion_detail: "",
    lanzamiento: "",
    link: "",
    empresa: "",
    fotoPortada: null,
    foto_1: null,
    foto_2: null,
    foto_3: null,
  });

  // Agregar estado para deshabilitar el botón
  const [isSubmitting, setIsSubmitting] = useState(false);

  //desestructuro el nombre y valor del input.
  const handleChange = (input) => {
    const { name, value } = input.target;
    setInputsRom((inputsRom) => ({
      ...inputsRom,
      [name]: value || "",
    }));
  };

  //desestructuro el nombre y valor del input de las fotos.
  const handleFileChange = (inputFoto) => {
    const { name, files } = inputFoto.target;
    setInputsRom((inputsRom) => ({
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
    const camposTextoExclutentes = [
      "titulo",
      "descripcion",
      "descripcion_detail",
      "lanzamiento",
      "link",
      "empresa",
    ];

    const camposLlenos = camposTextoExclutentes.every(
      (campo) => inputsRom[campo] !== ""
    );

    if (!camposLlenos) {
      //si hay campos vacios muestro un error en la consola.
      console.error("Hay campos de texto vacíos en el formulario.");
      //Alert!!!!!!!!!
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
        const camposFotos = ["fotoPortada", "foto_1", "foto_2", "foto_3"];
        //promesas de subida de las fotos.
        const uploadPromesas = camposFotos.map(async (foto) => {
          if (inputsRom[foto]) {
            const fileName = `${inputsRom.titulo}_${foto}`;
            const downloadURL = await uploadFile(inputsRom[foto], fileName);
            //retorno un objeto con el nombre de la foto y la url de la foto.
            return { [foto]: downloadURL };
          }
          //si no subio la foto retorno un null para controlar el error
          return { [foto]: null };
        });

        //guardo las url de las fotos en un objeto.
        const fotoURLs = await Promise.all(uploadPromesas);

        //actualizo el estado de las fotos con las url de las fotos.
        const updatedInputsRom = {
          ...inputsRom,
          ...Object.assign({}, ...fotoURLs),
          createdAt: new Date(),
        };

        //subo el formulario a firebase.
        const docRef = await addDoc(collection(db, "roms"), updatedInputsRom);

        //alert!!!!!
        console.info("Documento añadido con ID: ", docRef.id);
        Swal.fire({
          title: "Listo!",
          text: "ROM añadido con éxito.",
          icon: "success",
          position: "bottom-end",
          timer: 1000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
          popup: "custom-toast", // declaro la clsssname de la alerta y la uso en el css que esta en el src.
        });
      } catch (err) {
        console.error("Error al añadir el documento: ", err);
        //alert!!!!!!
        Swal.fire({
          title: "Error!",
          text: "Error al añadir el ROM",
          icon: "error",
          position: "bottom-end",
          timer: 1000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
          popup: "custom-toast", // declaro la clsssname de la alerta y la uso en el css que esta en el src.
        });
      } finally {
        //refresh de la pagina para q tome el cambio después de que suba el formulario.
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };

  return (
    <article className="contenedor_Forms">
      <h5>Nuevo ROM</h5>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <p>Título</p>
            <input
              name="titulo"
              type="text"
              placeholder="Título del juego."
              value={inputsRom.titulo || ""}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Descripción</p>
            <input
              name="descripcion"
              type="text"
              placeholder="Descripción de la card del juego."
              value={inputsRom.descripcion || ""}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Descripción extendida</p>
            <input
              name="descripcion_detail"
              type="text"
              placeholder="Descripción extendida del juego."
              value={inputsRom.descripcion_detail || ""}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Año de lanzamiento</p>
            <input
              name="lanzamiento"
              type="text"
              placeholder="Año de lanzamiento del juego."
              value={inputsRom.lanzamiento || ""}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Empresa</p>
            <input
              name="empresa"
              type="text"
              placeholder="Fabricante del juego."
              value={inputsRom.empresa || ""}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Link</p>
            <input
              name="link"
              type="text"
              placeholder="Link de descarga."
              value={inputsRom.link || ""}
              onChange={handleChange}
            />
          </li>
          <li>
            <p>Foto portada</p>
            <div className="contenedorFotosForms">
              <input
                name="fotoPortada"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </li>
          <li>
            <p>Fotos de gameplays</p>
            <div className="contenedorFotosForms">
              <input name="foto_1" type="file" onChange={handleFileChange} />
              <input name="foto_2" type="file" onChange={handleFileChange} />
              <input name="foto_3" type="file" onChange={handleFileChange} />
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
