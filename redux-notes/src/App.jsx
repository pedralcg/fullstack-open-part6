import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

// Crea el store de Redux, pasándole el noteReducer
const store = createStore(noteReducer);

// Despacha algunas acciones para añadir notas iniciales al store
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
});

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
});

// Despacha una acción para cambiar la importancia de una nota (para probar el reducer)
// Esto no tendrá efecto visible en la UI por ahora, ya que el reducer no lo implementa completamente.
store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
});


// Componente App: Muestra la lista de notas
const App = () => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* Mapea el estado de las notas del store a elementos de lista */}
        {store.getState().map(note =>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  );
};

// Configuración de renderizado de React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Función para renderizar la aplicación
const renderApp = () => {
  root.render(<App />);
};

// Realiza el primer renderizado
renderApp();

// Suscríbete al store para re-renderizar la aplicación cada vez que el estado cambie
store.subscribe(renderApp);

export default App;
