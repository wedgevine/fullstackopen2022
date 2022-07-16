import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h3>total of {sum} exercises</h3>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    return (
        <>
        {parts.map((part) => <Part key={part.id} part={part} />)}
        </>
    )
}

const getSum = (parts) => {
    return parts.reduce(
        (sum, part) => {
            sum += part.exercises
            return sum
        }, 0
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={getSum(course.parts)} />
        </div>
    )
}

export default Course
