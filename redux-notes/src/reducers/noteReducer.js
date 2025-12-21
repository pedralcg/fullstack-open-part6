// Reducer para gestionar el estado de las notas
// El estado inicial es un array vacío.
const noteReducer = (state = [], action) => {
  // Usa la declaración switch para manejar diferentes tipos de acciones
  switch (action.type) {
    case 'NEW_NOTE':
      // Devuelve un NUEVO array con la nueva nota añadida.
      // Usamos concat para asegurar la inmutabilidad del array.
      return state.concat(action.payload);

    case 'TOGGLE_IMPORTANCE': { // Se usa un bloque para evitar conflictos de scope con 'const'
      const id = action.payload.id; // Obtiene el ID de la nota a cambiar
      // Encuentra la nota a cambiar en el estado actual
      const noteToChange = state.find(n => n.id === id);

      // Crea un NUEVO objeto de nota con la propiedad 'important' invertida.
      // El operador spread (...) copia todas las propiedades de 'noteToChange'
      // y luego 'important: !noteToChange.important' sobrescribe la propiedad 'important'.
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };

      // Devuelve un NUEVO array donde la nota antigua es reemplazada por la nota modificada.
      // map crea un nuevo array, manteniendo la inmutabilidad.
      return state.map(note =>
        note.id !== id ? note : changedNote
      );
    } // Cierre del bloque para TOGGLE_IMPORTANCE

    default:
      // Si ninguna de las acciones anteriores coincide, devuelve el estado actual sin cambios.
      return state;
  }
};

export default noteReducer; // Exporta el reducer para poder importarlo en otros archivos