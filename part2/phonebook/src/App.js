import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'

import Search from './components/Search'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')
    const [message, setMessage] = useState(null)
    const successStyle = {
        color: 'green',
        border: 'solid'
    }
    const errorStyle = {
        color: 'red',
        border: 'solid'
    }
    const [style, setStyle] = useState({})

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const filteredPersons = persons.filter(
        (person) => person.name.toLowerCase().includes(searchName.toLowerCase())
    )

    const addPerson = (event) => {
        event.preventDefault()
        const name = newName.trim()
        const number = newNumber.trim()

        if (name === '' || number === '') {
            alert('name and number can not be empty')
            return null
        }

        const personObject = {
            name,
            number
        }
        const samePerson = persons.find(person => person.name === name)

        if (samePerson != undefined) {
            if (window.confirm(`${samePerson.name} is already added to phonebook,
                replace the old number with new one?`)) {
                personService
                    .update(samePerson.id, {...personObject, id: samePerson.id})
                    .then(returnPerson => {
                        setPersons(persons.map(person => person.id !== samePerson.id ? person : returnPerson))
                        setNewName('')
                        setNewNumber('')
                        setStyle(successStyle)
                        setMessage(`${returnPerson.name} number changed to ${returnPerson.number}`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        console.log(error)
                        setStyle(errorStyle)
                        setMessage(`information of ${samePerson.name} has already been removed from the server`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)

                    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnPerson => {
                    setPersons(persons.concat(returnPerson))
                    setNewName('')
                    setNewNumber('')
                    setStyle(successStyle)
                    setMessage(`${returnPerson.name} added`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log(error)
                })
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

    const handleDelete = (event) => {
        const id = event.target.value
        const person = persons.find(person => person.id == id)

        if (window.confirm(`Delete ${person.name}`)) {
            personService
                .remove(id)
                .then(removeStatus => {
                    if (removeStatus == 200) {
                       setPersons(persons.filter(person => person.id != id))
                    }
                    //console.log('remove ', removeReturn)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} style={style} />
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
            <Persons persons={filteredPersons} handleClick={handleDelete}/>
        </div>
    )

}

export default App
