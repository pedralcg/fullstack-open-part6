import React from 'react'; // Importa React para JSX
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderizar la aplicación
import { createStore } from 'redux'; // Importa la función createStore de la librería Redux

// Reducer: Define cómo cambia el estado en respuesta a las acciones.
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

// Store: Crea el store de Redux, pasándole el reducer.
const store = createStore(counterReducer);

// Componente App: La interfaz de usuario de nuestra aplicación.
const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button
        onClick={() => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={() => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button
        onClick={() => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  );
};

// Renderizado de la aplicación:
const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

// Realiza el primer renderizado de la aplicación.
renderApp();

// Suscripción al Store:
// Registra la función 'renderApp' para que se llame cada vez que el estado del store cambie.
store.subscribe(renderApp);

export default App; // Exporta el componente App