const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p> {props.partName} {props.exerciseCount} </p>
    )
}

const Content = (props) => {
    return (
        props.parts.map((part, index) => {
            return <Part key={index} partName={part.name} exerciseCount={part.exercises} />
        })
    )
}

const Total = (props) => {
    let total = 0
    props.parts.map(part => total += part.exercises)
    return (
        <p>Number of exercises {total}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}
export default App;
