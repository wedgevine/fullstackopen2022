import { useState } from 'react'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({text, value}) => (
    <tr>
        <td style={{paddingRight:'10px'}}>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total > 0) {
        return (
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={((good - bad) / total).toFixed(1)} />
                    <StatisticLine text="positive" value={((good / total) * 100).toFixed(2) + "%"} />
                </tbody>
            </table>
        )
    } else {
        return (
            <p>No feedback given</p>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h2>give feedback</h2>
            <Button text="good" handleClick={() => (setGood(good + 1))} />
            <Button text="neutral" handleClick={() => (setNeutral(neutral + 1))} />
            <Button text="bad" handleClick={() => (setBad(bad + 1))} />
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App;
