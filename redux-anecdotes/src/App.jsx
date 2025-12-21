import React from "react";

const App = ({ store }) => {
  const anecdotes = store.getState();

  const vote = (id) => {
    store.dispatch({
      type: "VOTE",
      data: { id },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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

export default App;
