/*
@author: Sergio Parilli
@version: 1.0
@description: To Do List
*/

/*
* @let list
* @Descripcion: se guarda en LocalStorag un array vacio*/


let list = JSON.parse(localStorage.getItem("tareas")) || [];
/*
* @function agregar
* @Descripcion: Funcion que agrega tareas a la lista
* @returns: {void} - Si se presiona CANCELAR,
            {function agregar} - Si no se ha escrito nada en el Prompt,
            {function agregar} - Si se ha escrito un numero en el prompt
*/

mostrarLista();
function agregar() {
  let tarea = prompt("Escribe una tarea\n\nPara salir presiona 'CANCELAR'");
  if (tarea === null) {
    return;
  }
  if (tarea.trim() === "") {
    alert("No se ha escrito nada.");
    return agregar();
  }
  if (!isNaN(tarea)) {
    alert("No es una tarea válida. Debes escribir texto.");
    return agregar()
  } 
  let tarea_object = {
    tarea: tarea,
    completada: false
  }
  list.push(tarea_object);
  localStorage.setItem("tareas", JSON.stringify(list));
  mostrarLista();
}

/*
* @function completar
* @Descripcion: Funcion que marca una tarea como completada
* @returns: {void} - Si no se ha escrito un numero en el prompt
*/
function completar() {
  if (largoLista()) {
    let tareaCompletada = prompt(
      "Ingresa el número de la tarea que deseas marcar como completada:"
    );
    if (numeroTarea(tareaCompletada)) {
      list[parseInt(tareaCompletada) - 1].completada = true;
    }
    localStorage.setItem("tareas", JSON.stringify(list));
    mostrarLista();
  }
}

/*
* @function borrar
* @Descripcion: Funcion que borra una tarea
* @returns: {void} - Si no se ha escrito un numero en el prompt
*/
function borrar(){
  if (largoLista()) {
    let tareaCompletada = prompt(
      "Ingresa el número de la tarea que deseas borrar:"
    );
    if (numeroTarea(tareaCompletada)) {
      list.splice(parseInt(tareaCompletada) - 1, 1);
    }
    mostrarLista();
  }
}

/*
* @function mostrarLista
* @Descripcion: Funcion que muestra las tareas en el HTML y cambia el texto e icono de "Completada" a "No Completada"
*/
function mostrarLista() {
  let listaTareas = document.getElementById("listaTareas");
  listaTareas.innerHTML = "";

  list.forEach((t, index) => {
    let li = document.createElement("li");
    li.textContent = `${index + 1}: ${t.tarea} >>> ${t.completada ? "✅ Completada" : "❌ No Completada"}`;
    listaTareas.appendChild(li);
  });
}

/*
* @function eliminarLista
* @Descripcion: Funcion que elimina todas las tareas de la lista
*/
function eliminarLista(){
  list = [];
  localStorage.removeItem("tareas");
  mostrarLista();
}
//VALIDACIONES

/*
* @function largoLista
* @Descripcion: Funcion que valida si la lista esta vacia
* @returns: {boolean} - Si la lista esta vacia
*/
function largoLista() {
  if (list.length == 0) {
    alert("No hay tareas en la lista");
    return false;
  } else {
    return true;
  }
}

/*
* @function numeroTarea
* @Descripcion: Funcion que valida si el numero de la tarea es valido
* @returns: {boolean} - Si el numero de la tarea es valido
*/
function numeroTarea(tareaCompletada) {
  if (tareaCompletada > 0 && tareaCompletada <= list.length && !isNaN(tareaCompletada)) {
    return true;
  } else {
    alert("Número de tarea no válido");
    return false;
  }
}
