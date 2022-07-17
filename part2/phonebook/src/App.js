import { useState } from 'react'

import Search from './components/Search'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    const filteredPersons = persons.filter(
        (person) => person.name.toLowerCase().includes(searchName.toLowerCase())
    )

    const addPerson = (event) => {
        event.preventDefault()
        //console.log(persons, newName)
        if (persons.find(person => person.name == newName.trim() ) != undefined) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({
                name: newName.trim(),
                number: newNumber.trim()
            }))
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchName = (event) => {
        setSearchName(event.target.value.trim())
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Search
                searchName={searchName}
                onChange={handleSearchName}
            />
            <AddPerson
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )

}

export default App
