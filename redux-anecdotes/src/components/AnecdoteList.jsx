import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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

  const vote = (id) => {
    // 4. Despachamos la acción usando el hook
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
