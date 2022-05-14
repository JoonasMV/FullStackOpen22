import { useState } from 'react'

// Title
const Header = () => {
  return (
    <h1>Give feedback</h1>
  )
}

// Statistics
const Stat = (props) => {
  return (
    <div>
      <h2>statistics</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.all}</p>
      <p>Average: {props.avg}</p>
      <p>Positive: {props.positive} %</p>
    </div>
  )
}

// Buttons 
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = value => {
    setGood(value+1)
  }

  const handleNeutral = value => {
    setNeutral(value+1)
  }

  const handleBad = value => {
    setBad(value+1)
  }

  // total feedback
  let total = good+neutral+bad

  // average
  let avg = (good-bad)/total

  // pos %
  let positive = good/total *100

  return (
    <div>
      <Header />
      <Button handleClick={() => handleGood(good)} text="good" />
      <Button handleClick={() => handleNeutral(neutral)} text="neutral" />
      <Button handleClick={() => handleBad(bad)} text="bad" />
      <Stat good={good} neutral={neutral} bad={bad} positive={positive} all={total} avg={avg} />
    </div>
  )
}

export default App
