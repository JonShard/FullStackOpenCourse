import { useState } from "react"


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Feedback = ({ onClickGood, onClickNeutral, onClickBad }) => {
  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={onClickGood} text='good' />
      <Button onClick={onClickNeutral} text='neutral' />
      <Button onClick={onClickBad} text='bad' />
    </div>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const positive = (all == 0) ? '0%' : ((good / all) * 100) + '%'

  // If no feedback, give graceful message  
  if (all == 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table border="1">
        <tbody>
          <StatisticsLine text='Good' value={good} />
          <StatisticsLine text='Neutral' value={neutral} />
          <StatisticsLine text='Bad' value={bad} />
          <StatisticsLine text='All' value={all} />
          <StatisticsLine text='Average' value={(good - bad) / all} />
          <StatisticsLine text='Positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback
        onClickGood={() => setGood(good + 1)}
        onClickNeutral={() => setNeutral(neutral + 1)}
        onClickBad={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App