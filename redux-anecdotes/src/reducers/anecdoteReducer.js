import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
    },
    // Modificamos createAnecdote para que reciba el objeto ya creado por el servidor
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    // Reemplaza el estado con los datos del servidor
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
