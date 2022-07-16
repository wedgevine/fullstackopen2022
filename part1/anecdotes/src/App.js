import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0])
    const [mostVoted, setMostVoted] = useState(0)

    const getRandomInt = (max) => {
        const r = Math.floor(Math.random() * max)
        //console.log(max, r)
        return r
    }

    const setVotedAnecdote = (voteIndex) => {
        const copy = [...vote]
        copy[voteIndex] += 1
        setVote(copy)
        if (copy[voteIndex] > copy[mostVoted]) {
            setMostVoted(voteIndex)
        }
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>
            <div>
                <button onClick={ () => { setVotedAnecdote(selected) } }>vote</button>
                <button onClick={ () => { setSelected(getRandomInt(7)) } }>next anecdote</button>
            </div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[mostVoted]}</p>
            <p>has {vote[mostVoted]} votes</p>
        </div>
    )
}

export default App
