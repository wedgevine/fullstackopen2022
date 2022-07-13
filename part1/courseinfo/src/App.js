const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    //console.log(props)
    return (
        <p> {props.partNumber} {props.exerciseCount} </p>
    )
}

const Content = (props) => {
    return (
        props.parts.map((part, index) => {
            //console.log(index, part)
            return <Part key={index} partNumber={part.partNumber} exerciseCount={part.exerciseCount} />
            /*
            return (
                <p> {part.partNumber} {part.exerciseCount} </p>
            )
            */
        })
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.total}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <>
            <Header course={course} />
            <Content parts={[
                {partNumber: part1, exerciseCount: exercises1},
                {partNumber: part2, exerciseCount: exercises2},
                {partNumber: part3, exerciseCount: exercises3},
                ]}
            />
            <Total total={exercises1 + exercises2 + exercises3} />
        </>
    )
}
export default App;
