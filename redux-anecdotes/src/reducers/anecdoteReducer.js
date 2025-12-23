import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"; // Importamos el servicio aquí

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // Esta acción ahora recibe el objeto completo que viene del servidor
    replaceAnecdote(state, action) {
      const changedAnecdote = action.payload;
      return state.map((a) =>
        a.id !== changedAnecdote.id ? a : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { replaceAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

// EL THUNK PARA EL 6.18
export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToVote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      anecdoteToVote
    );
    dispatch(replaceAnecdote(updatedAnecdote));
  };
};

// Action Creator Asíncrono (Thunk)
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

// Thunk para crear una nueva anécdota
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
