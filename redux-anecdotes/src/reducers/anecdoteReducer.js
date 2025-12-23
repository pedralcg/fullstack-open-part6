import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"; // Importamos el servicio aquí

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
    },
  },
});

export const { appendAnecdote, setAnecdotes, voteAnecdote } =
  anecdoteSlice.actions;

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
