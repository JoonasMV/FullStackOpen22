import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

// creates array filled with 0's
const points = Array(7).fill(0)
console.log(points)

let mostVoted

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(points)
  
  const handleSelected = value => {
    // checks that a new anecdote is displayed everytime
    while (true) {
      let rand = Math.floor(Math.random() *7)
      //console.log(rand)
      if (value !== rand) {
        setSelected(rand)
        break
      }
    }
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
    console.log(copy)
    mostVoted = copy.indexOf(Math.max(...copy))
    console.log(mostVoted)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <Button handleClick={() => handleSelected(selected)} text="next anecdote" />
      <Button handleClick={() => vote(selected)} text="vote" />
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

export default App  