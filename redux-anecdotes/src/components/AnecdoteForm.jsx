import { useDispatch } from "react-redux";
// Importamos SOLO el Thunk que creamos en el reducer
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // 1. Despachamos el Thunk.
    // Él se encarga de hablar con el servidor y de hacer el appendAnecdote interno.
    dispatch(createAnecdote(content));

    // Notificación simplificada
    dispatch(setNotification(`new anecdote '${content}' created`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
