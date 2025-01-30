## 8-bits reactJs.

Developer: Brian Sabatini.<br>
<br>
Dependencias:<br>
<br>
Copiar <br>
npm i <br>
npm i sass <br>
npm react-router<br>
npm react-router-dom<br>
npm install sweetalert2<br>

para correr:<br>
npm run dev<br>


------------------------!!!!!! lógica !!!!!----------------------------<br>

!! Archivos barril !!<br>
Todos los archivos que están en las carpetas integran un archivo index.js para mejor accesibilidad en uso de rutas.<br>
<br>
!! Pages !!<br>
Pages contiene una sola carpeta de estilos para todos sus archivos jsx.
<br>
!! Custom hooks !!!<br>
La lógica de las llamadas a la base de datosse guarda en archivos separados. Uno para obtener los datos a nivel documento y otro para tomar el ID. Esto podría mejorarse en un solo componente, pero da la oportunidad de darte una herramienta futura al guardar uno por ID. Los returns de los custom hooks son utilizados en los componentes ItemListContainer.jsx e ItemDetailContainer.jsx por medio de props.
<br>

------------------------!!!!!! Estilos !!!!!---------------------------<br>

El proyecto está planteado con estilos personalizados, se utilizó Sass para poder mantener prolijidad y la accesibilidad para mixins si se llega a necesitar.<br>
<br>
Concepto<br>
La idea es que el proyecto tenga la posibilidad de ser escalable, de fácil mantenimiento y full responsive. Se hace hincapié en el uso de estilos sin librerías de UI, pero se utiliza swal2 para agilizar las alertas y no crear un componente dinamico.
se trata de matener la semantica html correcta para una mejor lectura y calificacion.<br>
<br>
¡Muchas gracias por echarle un ojo!<br>
<br>
Brian Fabián Sabatini.<br>
