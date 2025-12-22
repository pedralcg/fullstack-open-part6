import { appendAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // Creamos el objeto manualmente
    const newAnecdote = {
      content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0,
    };

    // Usar dispatch() en lugar de store.dispatch()
    dispatch(appendAnecdote(newAnecdote));

    dispatch(setNotification(`new anecdote '${content}' created`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
