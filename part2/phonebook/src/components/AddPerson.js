import React from 'react'

const AddPerson = (props) => {
    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={props.addPerson}>
                <div>
                    name:
                    <input
                        value={props.newName}
                        onChange={props.handleNewName}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={props.newNumber}
                        onChange={props.handleNewNumber}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddPerson
