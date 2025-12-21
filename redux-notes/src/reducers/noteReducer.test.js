// src/reducers/noteReducer.test.js
import noteReducer from './noteReducer'; // Importa el reducer que vamos a probar
import deepFreeze from 'deep-freeze';    // Importa deep-freeze para asegurar la inmutabilidad

// Describe el conjunto de pruebas para noteReducer
describe('noteReducer', () => {
  // Test para la acción 'NEW_NOTE'
  test('returns new state with action NEW_NOTE', () => {
    const state = []; // Estado inicial: array vacío
    const action = {
      type: 'NEW_NOTE',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    };

    deepFreeze(state); // Congela el estado para detectar mutaciones
    const newState = noteReducer(state, action); // Llama al reducer

    expect(newState).toHaveLength(1); // Espera que el nuevo estado tenga 1 elemento
    expect(newState).toContainEqual(action.payload); // Espera que contenga la nota añadida
  });

  // TEST para la acción 'TOGGLE_IMPORTANCE'
  test('returns new state with action TOGGLE_IMPORTANCE', () => {
    // Estado inicial con dos notas
    const state = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      },
      {
        content: 'state changes are made with actions',
        important: false,
        id: 2
      }
    ];

    // Acción para alternar la importancia de la nota con id: 2
    const action = {
      type: 'TOGGLE_IMPORTANCE',
      payload: {
        id: 2
      }
    };

    deepFreeze(state); // Congela el estado inicial
    const newState = noteReducer(state, action); // Llama al reducer

    expect(newState).toHaveLength(2); // El número de notas no debe cambiar

    // Espera que la primera nota (id: 1) permanezca sin cambios
    expect(newState).toContainEqual(state[0]);

    // Espera que la segunda nota (id: 2) tenga la importancia cambiada a 'true'
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true, // <-- Ahora es true
      id: 2
    });
  });
});



//! Array spread syntax
