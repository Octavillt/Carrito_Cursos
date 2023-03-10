// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; // Se Declara un Arreglo Vacio para llenar con los Elementos del Objeto
// END Variables

cargarEventListeners(); // Manda a llamar las Funciones de addEventListener

function cargarEventListeners(){
    // Cuando agregas un Curso haciendo click a "agregar a Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar Cursos del Carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el Carrito de Todos los Cursos
    // Cuando sea Poco Codigo es Recomendable usar una Funcion Flecha Anonima
    vaciarCarritoBtn.addEventListener('click', () => {
        //console.log('Vaciando Carrito');
        articulosCarrito = []; // Vacia el Arreglo
        limpiaHTML(); // Elimina Todo el HTML
    });
}

//Funciones
function agregarCurso(e){
    e.preventDefault(); // Previene que se Recargue la Pagína
    if(e.target.classList.contains('agregar-carrito')){ // Solo se Acciona el Evento Si tiene el Nombre de esa Clase
        const cursoSeleccionado = e.target.parentElement.parentElement; // Se aplica el Traversing
        //console.log(e.target.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }
}


// Elimina Elementos-Curso del Carrito
function eliminarCurso(e){
    //console.log("Función Eliminar Carrito");
    //console.log(e.target.classList);
    if(e.target.classList.contains("borrar-curso")){ // Solo se Acciona el Evento Si tiene el Nombre de esa Clase
        //console.log(e.target.getAttribute("data-id")); 
        const cursoId = e.target.getAttribute("data-id"); // Accede al id de cada Elemento cuando da Click en Eliminar

        // Elimina del Arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); /* Trae los demas Elementos del Objeto Excepto
        al que de limos Click en Eliminar*/ 
        //console.log(articulosCarrito); 
        carritoHTML(); // Itera Nuevamente el Carrito Y Mustra el Nuevo HTML
    }
}

// Leer el contenido del HTML al que le damos click y extrae la info. del curso
function leerDatosCurso(curso){
    //console.log(curso);

    // Crear un Objeto con el Contenido del Curso Actual 
    const infoCursor = {
        imagen: curso.querySelector('img').src, // Obtiene la Ruta de la Imagen
        titulo: curso.querySelector('h4').textContent, // Obtiene el Texto del Titulo del Curso
        precio: curso.querySelector('.precio span').textContent, // Obtiene el Texto del Precio del Curso
        id: curso.querySelector('a').getAttribute('data-id'), // Obtiene el id del atributo data-id de cada Curso
        cantidad: 1 // La Cantidad del Curso va a Cmenzar en 1
    }
    // console.log(infoCursor);

    /*
    Valida si un Curso ya Existe en el Carrito
    Si No Existe hace los siguiente:
    */
    const existe = articulosCarrito.some(curso => curso.id === infoCursor.id); // some() Valida y retorna true o false 
    //console.log(existe);
    if(existe){
        // Actualiza la Cantidad del Curso al Carrito
        const cursos = articulosCarrito.map(curso => { // Itera los Elementos que Contiene el Arreglo 
            // Valida Si el Curso Seleccionado ya se encuentra en el Objeto
            if(curso.id === infoCursor.id){
                curso.cantidad++; // Incrementa la Catidad de Veces que se Encuentra Elemento en el Arreglo
                return curso; // Retorna el Objeto Actulizado
            }else{
                return curso; // Retorna los Elementos que No estan Duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        // agregamos Nuevo Curso al Carrito
        // Agrega Elelmentos al Arreglo del Carrito con Spread Operator
        articulosCarrito = [...articulosCarrito, infoCursor]; // Se Toma una Copia de lo que hay en el Carrito y se Concatena los Nuevos Elementos
        //console.log(articulosCarrito);
    }
    carritoHTML();
}

  // Muestra el Carrito de Compras en el HTML
  function carritoHTML(){
    // Limpiar el HTML para No tener Duplicados
    limpiaHTML();

    // Recorre el Carrito y Genera el HTML
    articulosCarrito.forEach(curso =>{
        const { imagen, titulo, precio, cantidad, id } = curso;
        //console.log(curso);
        const row = document.createElement('tr'); // Crea una Nueva Fila por cada Curso Seleccionado
        row.innerHTML = ` 
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        // Agrega el HTML del Carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los Cursos Repetidos del tbody
function limpiaHTML(){
    // Forma Lenta
    //contenedorCarrito.innerHTML = '';

    // Forma Rapida
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

//END Funciones