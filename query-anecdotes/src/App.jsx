import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {
  // 1. Definimos la consulta al servidor
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  // 2. Manejamos el estado de carga
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  // 3. Manejamos el error (Ejercicio 6.20: Mensaje de servidor no disponible)
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  // Si llegamos aquí, los datos existen en result.data
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
