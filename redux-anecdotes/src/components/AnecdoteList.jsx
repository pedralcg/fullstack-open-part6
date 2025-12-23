import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  // 1. Usamos useSelector para obtener las anécdotas Y el filtro del estado global
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL" || state.filter === "") {
      return state.anecdotes;
    }
    // Filtramos las anécdotas según el texto del buscador
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  // 2. Obtenemos la función dispatch de react-redux
  const dispatch = useDispatch();

  // 3. Ordenamos las anécdotas filtradas por votos
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    // Usamos el thunk asíncrono
    dispatch(voteForAnecdote(anecdote));

    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
