import React from 'react'

const Person = ({person, handleClick}) => {
    return (
        <p>
            {person.name} {person.number}
            <button value={person.id} onClick={handleClick}>delete</button>
        </p>
    )
}

const Persons = ({persons, handleClick}) => {
    return (
        <>
        {
            persons.map((person) => <Person key={person.name} person={person} handleClick={handleClick} />)
        }
        </>
    )
}

export default Persons
